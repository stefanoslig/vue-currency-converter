export interface ChartSeries {
  name?: string;
  data: number[];
}

export interface ChartOptions {
  chart: Chart;
  grid: ChartGrid;
  xaxis: {
    categories: string[];
  };
  yaxis: {
    opposite: boolean;
  };
}

interface Chart {
  type: string;
  height: number;
  width: number;
  zoom: {
    enabled: boolean;
  };
}

interface ChartGrid {
  row: ChartGridRow;
}

interface ChartGridRow {
  colors: string[];
  opacity: number;
}
