import * as d3 from 'd3';
import type { Geometry } from 'geojson';
import React, { useEffect, useRef } from 'react';
import * as topojson from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { useBook } from "../../context/BookContext";
import styles from './MiddleEastMap.module.css';



//const jerusalemCoords: [number, number] = locationCoords; // [lon, lat]

const MiddleEastMap: React.FC = () => {
  const {
    locationName,
    locationCoords,
  } = useBook();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const container = containerRef.current;
    const svgElement = svgRef.current;
    if (!svgElement || !container) return;

    const width = container.clientWidth;
    const height = 600;

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove(); // 👈 Wipe EVERYTHING clean

    const g = svg.append('g').attr('class', 'zoom-group');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    const renderMap = async () => {
      try {
        const topoData = await d3.json('/map/countries-110m.json');
        const worldTopology = topoData as Topology;

        const geojson = topojson.feature(
          worldTopology,
          worldTopology.objects['countries'] as GeometryCollection
        ) as GeoJSON.FeatureCollection<Geometry>;

        const features = geojson.features;
        if (!features.length) return;

        const projection = d3.geoNaturalEarth1().fitSize([width, height], geojson);
        const pathGenerator = d3.geoPath(projection);

        // Draw countries
        g.selectAll('path.country')
          .data(features)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('d', (d) => pathGenerator(d) || '')
          .attr('fill', 'white')
          .attr('stroke', '#333')
          .attr('stroke-width', 0.5);

        // Borders
        const borders = topojson.mesh(
          worldTopology,
          worldTopology.objects['countries'] as GeometryCollection,
          (a, b) => a !== b
        );

        g.append('path')
          .datum(borders)
          .attr('fill', 'none')
          .attr('stroke', '#333')
          .attr('stroke-width', .1)
          .attr('d', pathGenerator);

        const baseRadius = Math.max(3, width / 200);
        // Red bubble: Jerusalem
        const [x, y] = projection(locationCoords) || [0, 0];

        g.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', width / 600)
          .attr('fill', '#333')
          .attr('stroke', '#333')
          .attr('stroke-width', 1);

        g.append('text')
          .attr('x', x + 2 + 4) // add small offset to the right
          .attr('y', y)
          .attr('alignment-baseline', 'middle')
          .attr('font-size', 5) // responsive text size
          .attr('fill', '#333')
          .text(locationName);

        // Enable zoom
        svg.call(zoom);

        // Zoom to Jerusalem
        const scale = 4;
        svg.transition()
          .duration(1000)
          .call(
            zoom.transform,
            d3.zoomIdentity
              .translate(width / 2, height / 2)
              .scale(scale)
              .translate(-x, -y)
          );
      } catch (err) {
        console.error('Map render error:', err);
      }
    };

    renderMap();

    // ✅ Clean up on unmount
    return () => {
      svg.on('.zoom', null); // unbind zoom events
      svg.selectAll('*').remove(); // remove everything inside svg
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.mapContainer}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
};

export default MiddleEastMap;
