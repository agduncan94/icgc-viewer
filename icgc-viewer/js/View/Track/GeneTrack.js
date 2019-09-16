define(
    [
        "dojo/_base/declare",
        "JBrowse/View/Track/CanvasFeatures",
        'JBrowse/View/Track/_ExportMixin',
        'dojo/dom-construct'
    ],
   function(
       declare,
       CanvasFeatures,
       ExportMixin,
       domConstruct) {
   return declare([ CanvasFeatures, ExportMixin ], {

        _exportFormats: function() {
            return [
                {name: 'icgc-viewer/View/Export/GFF3', label: 'GFF3', fileExt: 'gff3'},
                {name: 'icgc-viewer/View/Export/BED', label: 'BED', fileExt: 'bed'},
                {name: 'icgc-viewer/View/Export/CSV', label: 'CSV', fileExt: 'csv'},
                {name: 'icgc-viewer/View/Export/SequinTable', label: 'Sequin Table', fileExt: 'sqn'},
                {name: 'icgc-viewer/View/Export/TrackConfig', label: 'Track Config', fileExt: 'conf'},
                {name: 'icgc-viewer/View/Export/TrackConfigJson', label: 'Track Config JSON', fileExt: 'json'}
            ];
        },

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
        },

        _trackMenuOptions: function () {
            var track = this;
            var options = this.inherited(arguments);
            options.push({
                label: 'Share Track as URL',
                action: "contentDialog",
                title: 'Share Track as URL',
                content: dojo.hitch(this,'_shareableLinkContent')
            });
            return options;
        },

        _shareableLinkContent: function() {
            var track = this;
            var details = domConstruct.create('div', { className: 'detail', style: 'display: flex; flex-direction: column; align-items: center; justify-content: center;' });

            // Create addTracks value
            var addTracksArray = [];
            var addTrackConf = {};
            addTrackConf.label = track.config.label;
            addTrackConf.storeClass = track.store.config.type;
            addTrackConf.type = track.config.type;
            addTrackConf.key = track.config.key;
            addTrackConf.metadata = track.config.metadata;
            addTrackConf.unsafePopup = true;
            addTrackConf.filters = track.store.config.filters;
            addTrackConf.donor = track.store.config.donor;
            addTrackConf.size = track.config.size;
            addTrackConf.fmtDetailValue_annotations = function(value) { return '<div>Loading content...</div>';};
            addTracksArray.push(addTrackConf);
            addTracksArray = JSON.stringify(addTracksArray); // Stringify doesn't copy over fmtDetailValue

            // Create a shareable URL
            var params = new URLSearchParams(window.location.search);
            params.set("addTracks", addTracksArray);
            var shareableLink = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();

            // Create help text
            var helpString = '<p>Use the following link to share the selected track at the current location.</p>';
            var helpElement = domConstruct.toDom(helpString);
            domConstruct.place(helpElement, details);

            // Create text area with shareable link
            var textArea = domConstruct.create(
                'textarea',{
                    rows: 10,
                    value: shareableLink,
                    style: "width: 80%",
                    readOnly: true
                }, details );

            // Create a DOM element for the link
            var linkString = '<a target="_blank" href="' + shareableLink + '">Open in New Tab</a>';
            var linkElement = domConstruct.toDom(linkString);
            domConstruct.place(linkElement, details);

            return details;
        },
   }); 
   }   
);