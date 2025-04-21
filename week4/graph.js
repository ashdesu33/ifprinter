function week4() {
gallery.innerHTML="";
note.innerHTML='';

gallery.style.background="black";
note.style.background="black";
note.style.color="white";

note.innerHTML=`
<h3> week 4 note </h3>
<hr>
<h3>CHRONICLES</h3>

  <p>
    I’m interested in making things physical, but I’m also bad at building stuff. Even with all the YouTube tutorial’s help, my plotter’s z-axis and y-axis still work so poorly that I have to hold the paper all the time to make sure it at least draws something on the paper, and the final printed images have so little in common with the image I programmed. The whole process was frustrating, yet funny to me because how this machine failed so hard at its work just like its creator. It’s funny that after countless retries, moving and pressing the paper with the motors, I was finally able to produce enough “failed” works that I can stage them as they were intended to fail like this.
  </p>

  <h3>ANALYSIS – Viktor by Jürg Lehni</h3>

  <p>
    Whether it is intentionally or unintentionally, the tools have hugely shifted the ways of visual communication. The profession of visual design is hugely intertwined with the history of technology and production, and hence the overpowering of machines has caused a rising fear and anxiety of being replaced/left behind. This is why Jürg’s work <em>Viktor</em> became an important reference to speculate the proposition of the machinery and human in the post-industrial era. By actively collaborating with the lecturer, Jürg’s drawing machine has shifted focus on the special imperfect texture defined by gestures of moving motors and the human body.
  </p>

  <h3>POSSIBLE PROPOSITIONS (Strategies)</h3>

  <p>
    In the western graphic design education, there is a special stress on typography as a result of modern graphic design practice established by the Bauhaus and Swiss schools. As Jan Tschichold has stated in <em>The Principle of New Typography</em>, the development of technology has shifted the printed matter focus less in form but in quantity, hence the typography became a crucial component to adapt the modern functional needs for visual communication, and should strive for clarity rather than the excessive ornament. Jan Tschichold is right to point out the tendency of visual communication is always in relation to the market needs and material condition. However, I assume he would still be surprised how fast the information consumption has become. It becomes dangerous when designers become too responsive to the market demand. How do we draw the line between utilitarian and functional? The clarity of typography for whom?
  </p>

  <p>
    Typography, or graphic design in general, should position themselves as parts of intentions to establish visual experiences with the collaboration of community rather than functional entities. To distinguish an experience from a functional entity is that experience does not necessarily have to result in the designated purpose, but it is the intention to find the maximum intersection with the acknowledgment of the inevitable failures in generalization. Now the urgency is not about whether there is a way to invent a new experience–there is nothing left to be invented–but how to regain the communal space without converting the “others” to “us”, "us" to the "others".
  </p>
`


d3.select("#process-graph").remove(); // Remove existing SVG
d3.select(".gallery").append("svg") // Recreate a new SVG
    .attr("id", "process-graph")
    .attr("width", "400px")
    .attr("height", "400px")
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
    const width = 800;
    const height = 800;
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