/*
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {observable} from "mobx";
import {inject, observer} from "mobx-react";
import * as React from "react";
import {Component} from "react";
import "./App.css";
import {IDataItem, IRootStore} from "./model";

am4core.useTheme(am4themes_animated);


interface IMyChartProps {
    rootStore?: IRootStore;
    chartData?: IDataItem[];
}

@inject("rootStore")
@observer
class MyChart extends Component<IMyChartProps> {
    @observable
    private chart: am4charts.XYChart;


    componentDidMount() {
        this.createChart();
    }


    private updateDataChart() {
        if (this.props.chartData && this.chart) {
            console.log("updateDataChart");
            this.chart.data = this.props.chartData;
        }
    }


    private createChart() {
        console.log(this.props.rootStore);
        this.chart = am4core.create("chartdiv", am4charts.XYChart);

        this.chart.paddingRight = 20;

        let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip!.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";

        series.tooltipText = "{valueY.value}";
        this.chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        this.chart.scrollbarX = scrollbarX;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        this.updateDataChart();
        return <>
            <div id="chartdiv" style={{width: "100%", height: "500px"}}/>
        </>
    }
}

export default MyChart;
*/
