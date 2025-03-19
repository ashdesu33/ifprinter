function week4() {
public.innerHTML="";
d3.select("#process-graph").remove(); // Remove existing SVG
d3.select("body").append("svg") // Recreate a new SVG
    .attr("id", "process-graph")
    .attr("width", "100vw")
    .attr("height", "100vh")
    .attr("y","-100");

    
    const nodes = [
        { id: "Software Instruction" }, { id: "OS & Drivers" },
        { id: "CPU/GPU Processing" }, { id: "Rasterization" },
        { id: "Color Management" }, { id: "Subpixel Rendering" },
        { id: "Frame Buffer Composition" }, { id: "Digital Signal Conversion" },
        { id: "Display Hardware Execution" }, { id: "Pixel on Screen" },

        { id: "Print Command" }, { id: "Raster Image Processing" },
        { id: "CMYK Color Separation" }, { id: "Halftoning & Dithering" },
        { id: "Printer Firmware" }, { id: "Laser Exposure" },
        { id: "Toner Transfer" }, { id: "Fusing Process" },
        { id: "Printed Pixel" },

        { id: "Rasterization (Shared)" }, { id: "Color Processing (Shared)" }
    ];

    const links = [
        { source: "Software Instruction", target: "OS & Drivers", type: "digital" },
        { source: "OS & Drivers", target: "CPU/GPU Processing", type: "digital" },
        { source: "CPU/GPU Processing", target: "Rasterization", type: "digital" },
        { source: "Rasterization", target: "Color Management", type: "digital" },
        { source: "Color Management", target: "Subpixel Rendering", type: "digital" },
        { source: "Subpixel Rendering", target: "Frame Buffer Composition", type: "digital" },
        { source: "Frame Buffer Composition", target: "Digital Signal Conversion", type: "digital" },
        { source: "Digital Signal Conversion", target: "Display Hardware Execution", type: "digital" },
        { source: "Display Hardware Execution", target: "Pixel on Screen", type: "digital" },

        { source: "Print Command", target: "Raster Image Processing", type: "physical" },
        { source: "Raster Image Processing", target: "CMYK Color Separation", type: "physical" },
        { source: "CMYK Color Separation", target: "Halftoning & Dithering", type: "physical" },
        { source: "Halftoning & Dithering", target: "Printer Firmware", type: "physical" },
        { source: "Printer Firmware", target: "Laser Exposure", type: "physical" },
        { source: "Laser Exposure", target: "Toner Transfer", type: "physical" },
        { source: "Toner Transfer", target: "Fusing Process", type: "physical" },
        { source: "Fusing Process", target: "Printed Pixel", type: "physical" },

        { source: "CPU/GPU Processing", target: "Rasterization (Shared)", type: "common" },
        { source: "Raster Image Processing", target: "Rasterization (Shared)", type: "common" },
        { source: "Color Management", target: "Color Processing (Shared)", type: "common" },
        { source: "CMYK Color Separation", target: "Color Processing (Shared)", type: "common" }
    ];
    const svg = d3.select("#process-graph");
            svg.style("display", "block");
    const width = window.innerWidth;
    const height = window.innerHeight * 0.8;
            svg.attr("width", width).attr("height", height);
    const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(80))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("class", d => "link " + d.type);

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 10)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    const text = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("dy", -12)
        .text(d => d.id);

        simulation.on("tick", () => {
            link.attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        
            node.attr("cx", d => d.x = Math.max(100, Math.min(width - 100, d.x))) 
                .attr("cy", d => d.y = Math.max(100, Math.min(height - 100, d.y))); 
        
            text.attr("x", d => d.x)
                .attr("y", d => d.y );
        });
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    function linkArc(d) {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        return `
          M${d.source.x},${d.source.y}
          A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `;
      }
}