define(
    [
        "dojo/_base/declare",
        'dojo/dom-construct',
        './BaseTrack'
    ],
   function(
       declare,
       domConstruct,
       BaseTrack) {
   return declare(BaseTrack, {

        _renderAdditionalTagsDetail: function( track, f, featDiv, container ) {
            var atElement = domConstruct.create(
                'div',
                { className: 'additional',
                innerHTML: '<h2 class="sectiontitle">Information</h2>'
                },
                container )

                var coreDetailsContent = dojo.create('div', { className: 'core', style: 'display: flex; flex-direction: column;' }, atElement );
                var firstRow = dojo.create('div', { style: 'display: flex; flex-direction: row;' }, coreDetailsContent );
                var secondRow = dojo.create('div', { style: 'display: flex; flex-direction: row;' }, coreDetailsContent );
                var thirdRow = dojo.create('div', { style: 'display: flex; flex-direction: row;' }, coreDetailsContent );

                var descriptionSection = dojo.create('div', { style: 'flex-grow:1; flex-basis: 0' }, firstRow)
                this.renderDetailField( descriptionSection, 'gene description', f.get('gene description'), f, undefined, track.store.getTagMetadata('gene description'))

                var aboutSection = dojo.create('div', { style: 'flex-grow:1; flex-basis: 0' }, secondRow)
                var referenceSection = dojo.create('div', { style: 'flex-grow:1; flex-basis: 0' }, secondRow)

                this.renderDetailField( aboutSection, 'about', f.get('about'), f, undefined, track.store.getTagMetadata('about'))
                this.renderDetailField( referenceSection, 'references', f.get('references'), f, undefined, track.store.getTagMetadata('references'))

                var annotationSection = dojo.create('div', { style: 'flex-grow:1; flex-basis: 0' }, thirdRow)
                this.renderDetailField( annotationSection, 'annotations', f.get('annotations'), f, undefined, track.store.getTagMetadata('annotations'))
        }
   }); 
   }   
);