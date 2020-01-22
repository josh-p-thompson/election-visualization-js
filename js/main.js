let state = {
    data: [],
    year_options: [],
}; 

fetch("./data/data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // putting data in state
        state.data = data;
        // putting election year options in state
        for (let row of Object.values(state.data)) {
            if (!state.year_options.includes(row.year)) {
                state.year_options.push(row.year);
            }
        }
        renderYears();
        render();
    })

function renderYears() {
    // putting election year options into DOM
    chartSelectorsYear = document.querySelector("#Chart-selectors-year"); 
    chartSelectorsYear.innerHTML = state.year_options.map(
        year => {
            return `<option>${year}</option>`
        }
    ).join("");
}

function formatData(data, format) {
    if (format==='percentage') {
        return data + '%'; 
    } else {
        return data.toLocaleString(); 
    }
}

function render() {
    // pull selected year
    let selectedYearElement = document.querySelector( "#Chart-selectors-year");
    let selectedYear = selectedYearElement.options[ selectedYearElement.selectedIndex ].value;
    
    // pull selected format
    let selectedFormatElement = document.querySelector( "#Chart-selectors-format");
    let selectedFormat = selectedFormatElement.options[ selectedFormatElement.selectedIndex ].value;

    let chartLeft = document.querySelector("#chart-left");
    let newChartLeft = ""
    let chartRight = document.querySelector("#chart-right");
    let newChartRight = ""
    for (let row of Object.values(state.data)) {
        if (row.year === parseInt(selectedYear)) {
            if (row.party==='democrat') {
                let newChart = `
                <div class="Chart-row">
                <div class="Chart-barLabel"> 
                    ${row.state}
                </div>
                <div class="u-dottedLine"></div>
                <div class="Chart-bar DemocraticBar ${row.state_po}" id="D-${row.state_po}" style="width: ${row.percentage}%;" onclick="alert('${row.candidate} - ${row.candidatevotes}')">
                    ${formatData(data=row[selectedFormat], format=selectedFormat)}
                </div>
                </div>
                `
                newChartLeft = newChartLeft.concat(newChart);
            } else {
                let newChart = `
                <div class="Chart-row">
                <div class="Chart-bar RepublicanBar ${row.state_po}" id="R-${row.state_po}" style="width: ${row.percentage}%;" onclick="alert('WINNER')">
                    ${formatData(data=row[selectedFormat], format=selectedFormat)}
                </div>
                <div class="u-dottedLine"></div>
                <div class="Chart-barLabel"> 
                ${row.state}
                </div>
                </div>
                `
                newChartRight = newChartRight.concat(newChart);
            }
        }
    }
    chartLeft.innerHTML = newChartLeft;
    chartRight.innerHTML = newChartRight;
}

