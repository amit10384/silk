define(function (require) {
  return function TileMapVisType(Private) {
    var VislibVisType = Private(require('plugins/vis_types/vislib/_vislib_vis_type'));
    var Schemas = Private(require('plugins/vis_types/_schemas'));
    var geoJsonConverter = Private(require('components/agg_response/geo_json/geo_json'));

    return new VislibVisType({
      name: 'tile_map',
      title: 'Tile map',
      icon: 'fa-map-marker',
      description: 'Your source for geographic maps. Requires a Solr location or location_rpt field.',
      params: {
        defaults: {
          mapType: 'Shaded Circle Markers',
          isDesaturated: true
        },
        mapTypes: ['Shaded Circle Markers', 'Scaled Circle Markers'],
        editor: require('text!plugins/vis_types/vislib/editors/tile_map.html')
      },
      responseConverter: geoJsonConverter,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Value',
          min: 1,
          max: 1,
          // aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality'],
          // Disable 'avg', 'sum', 'min', 'max', 'cardinality' aggFilter. We don't support it yet.
          aggFilter: ['count'],
          defaults: [
            { schema: 'metric', type: 'count' }
          ]
        },
        {
          group: 'buckets',
          name: 'segment',
          title: 'Geo Coordinates',
          aggFilter: 'geohash_grid',
          min: 1,
          max: 1
        },
        {
          group: 'buckets',
          name: 'split',
          title: 'Split Chart',
          min: 0,
          max: 1
        }
      ])
    });
  };
});
