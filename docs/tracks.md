---
layout: default
title: Tracks
nav_order: 3
---

# Tracks
{: .no_toc }

Create Mutation (SSM) and Gene tracks using a dynamic track generator
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

# Filters
All of these tracks support filters as they are used in the ICGC API Documentation.

You can view/edit the filters associated with a track by clicking the down arrow for the track menu and selecting `View Applied Filters`. Be careful, there are currently no checks to see if the filters are valid before applying them.

# Available Track Types

## Genes
A simple view of all genes seen across all donors in the ICGC portal.

If you specify a donor ID (donor field) in the track config file, only genes related to that donor will appear. This field supports multiple IDs at a time using by using commas.
```
donor: DO229446
```

You can also use the filters field to pass filters to be applied to the track. The expected input is a filter object like the following:

```
{
    "gene" : {
        "type": {
            "is": [
                "protein_coding"
            ]
        }
    }
}
```

To put it in the track config file you may want to minimize it as such:
```
filters={"gene":{"type":{"is":["protein_coding"]}}}
```

Example Track:
```
[tracks.ICGC_Genes_protein-coding]
storeClass=icgc-viewer/Store/SeqFeature/Genes
type=icgc-viewer/View/Track/GeneTrack
key=ICGC_Genes_protein-coding
unsafePopup=true
filters={"gene":{"type":{"is":["protein_coding"]}}}
```

![ICGC Genes]({{ site.url }}/assets/images/ICGC-Genes-protein-coding.png)

### Extra notes
{: .no_toc }
You can also set the `size` attribute (defaults to 1000). This is the theoretical maximum number of genes displayed at a time in JBrowse (per panel). The smaller the value, the faster JBrowse will be.

## SimpleSomaticMutations
A simple view of all the simple somatic mutations across all donors in the ICGC portal. 

If you specify a donor ID (donor field) in the track config file, only mutations related to the given donor will be shown (if the donor exists).
```
donor: DO229446
```

You can also use the filters field to pass filters to be applied to the track. The expected input is a filter object like the following:

```
{
    "mutation" : {
        "functionalImpact": {
            "is": [
                "High"
            ]
        }
    }
}
```

To put it in the track config file you may want to minimize it as such:
```
filters={"mutation":{"functionalImpact":{"is":["High"]}}}
```

Example Track:
```
[tracks.ICGC_Mutations_high-impact]
storeClass=icgc-viewer/Store/SeqFeature/SimpleSomaticMutations
type=icgc-viewer/View/Track/SSMTrack
key=ICGC_Mutations_high-impact
unsafePopup=true
filters={"mutation":{"functionalImpact":{"is":["High"]}}}
```

![ICGC SSMs]({{ site.url }}/assets/images/ICGC-SSM-high-impact.png)

### Extra notes
{: .no_toc }
You can also set the `size` attribute (defaults to 500). This is the theoretical maximum number of mutations displayed at a time in JBrowse(per panel). The smaller the value, the faster JBrowse will be.

# Dynamic track generation
## Explore donors, genes and mutations
In the menubar there is an ICGC button with an option to `Explore donors, genes and mutations`. This will bring up a dialog similar to the [advanced search page](https://dcc.icgc.org/search) on the ICGC portal. Here you can apply facets related to donor, gene and mutation. You can then create tracks based on the chosen facets.

![ICGC Explore]({{ site.url }}/assets/images/ICGC-Explore-Dialog.png)


## Explore projects
There is also an options to search ICGC by projects. This allows you to see all of the associated Mutations and Genes per project in one track. If you want to apply additional facets to a project, you'll need to use the `Explore donors, genes and mutations` dialog.

![ICGC Projects]({{ site.url }}/assets/images/ICGC-Projects-Dialog.png)

# Export Types
The following export types are supported by both Genes and Mutations. To export, select `Save track data` in the track dropdown. Note that not all track information is carried over to the exported file.
* BED
* GFF3
* Sequin Table
* CSV
* Track Config

# Miscellaneous
## Advanced Usage of Tracks
You do not need to add tracks directly from the ICGC Dialog. You can also define them in the `tracks.conf` file.

See `data/advanced-tracks.conf` for some more complex usages, including filters.