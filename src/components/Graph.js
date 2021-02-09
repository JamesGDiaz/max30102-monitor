import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartData() {
      this.$data._chart.update()
    }
  }
}

export const options = {
  //Chart.js options
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }
    ],
    xAxes: [
      {
        type: 'time',
        ticks: {
          maxTicksLimit: 5
        },
        time: {
          unit: 'second',
          displayFormats: {
            second: 'HH:mm:ss'
          },
          tooltipFormat: 'HH:mm:ss'
        }
      }
    ]
  },
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 0 // disables bezier curves
    }
  },
  animation: {
    duration: 0 // general animation time
  },
  hover: {
    animationDuration: 0 // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 0
}
