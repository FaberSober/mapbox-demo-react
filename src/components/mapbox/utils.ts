import mapboxgl from 'mapbox-gl';

// http://localhost:8080/geoserver/gwc/service/tms/1.0.0/map%3Ahami-arcgis-L17@EPSG%3A900913@png/{z}/{x}/{y}.png
/**
 * 生成mapbox加载图层
 * @param url 瓦片服务
 */
export function genMapStyle(url: string): mapboxgl.Style {
	return {
		version: 8,
		name: 'Mapbox Streets',
		// sprite图片
		sprite: `${window.location.origin}/plugins/mapbox-gl-js/v2.3.1/sprite/sprite`,
		glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
		sources: {
			// 'osm-tiles-arcgis': {
			//   type: 'raster',
			//   tiles: ['http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6'], // 高德地图卫星图层
			//   // tiles: ['http://ip:port/arcgis/rest/services/test/china/MapServer/export?dpi=96&transparent=true&format=png8&layers=&bbox={bbox-epsg-3857}&f=image&bboxSR=102100&imageSR=102100'], // 高德地图卫星图层
			//   // tiles: [url],
			//   // scheme: 'tms',
			//   // minzoom: 1,
			//   // maxzoom: 18,
			//   tileSize: 256,
			// },
			'osm-tiles-17': {
				type: 'raster',
				// tiles: ['http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6'], // 高德地图卫星图层
				// tiles: ['https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{x}/{y}'],
				// tiles: ['https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}'],
				tiles: ['http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png'], // 使用固定arcgis外网地图服务
				// tiles: ['https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}?token=P7tDdpf1NZ6am6_wVvjP0wO5qD5iOSqiGmEQfFCEiip8rUVhLStolAAFZXQok3wxjNG_cM3vBSKOoY7JzarkoIChb4C6sx8OT1v7ZFf1K0zmRtgYybzir7SOU5DCOY2W_uuoFKqprjT5QwT6CbEXX2lniAQ5i6F-bzQU9AJejZoBxE_evJygh-l1N8H3yoRk3kULyQ3tciD_hyVkcJsyx_NnD8sZ2VSloQKGX0cECSXOmffVlbZcjtt6OXYPfDK-1l3HVD1UI_VsXZ0r16OpS42AfoeqFQv0y0ftWfmC-chL-zXU_1Wdy3uPRl3Daus2'],
				// tiles: [url],
				scheme: 'xyz',
				minzoom: 1,
				maxzoom: 16,
				tileSize: 256,
			},
		},
		layers: [
			// {
			// 	id: '111',
			// 	type: 'raster',
			// 	source: 'osm-tiles-arcgis',
			// 	'source-layer': 'osmtiles',
			// },
			{
				id: 'layer-17',
				type: 'raster',
				source: 'osm-tiles-17',
				'source-layer': 'osmtiles',
			},
		],
	};
}
