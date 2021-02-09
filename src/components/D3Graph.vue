<template>
  <div id="graph" ref="prev"></div>
</template>

<script>
import * as d3 from 'd3'

var n = 40,
  random = d3.randomNormal(0, 0.2)

export default {
  props: ['xdata', 'ydata'],
  data() {
    return {
      width: 0,
      height: 0,
      margin: {
        top: 50,
        right: 50,
        left: 50,
        bottom: 50
      },
      data: d3.range(n).map(random)
    }
  },
  methods: {
    getWindowWidth() {
      this.width = this.$refs.prev.clientWidth
      this.height = this.$refs.prev.clientHeight
    },
    init() {
      //We are accessing the div with the id chart using d3's select method and appending svg
      const svg = d3
        .select('div#graph')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .style(
          'transform',
          `translate(${this.margin.left}px, ${this.margin.top}px)`
        )
      var n = 40,
        random = d3.randomNormal(0, 0.2),
        data = d3.range(n).map(random)

      var x = d3
        .scaleLinear()
        .domain([0, n - 1])
        .range([0, width])

      var y = d3.scaleLinear().domain([-1, 1]).range([height, 0])

      var line = d3
        .line()
        //eslint disable-next-line
        .x(function (d, i) {
          return x(i)
        })
        //eslint disable-next-line
        .y(function (d, i) {
          return y(d)
        })

      g.append('defs')
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', width)
        .attr('height', height)

      g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + y(0) + ')')
        .call(d3.axisBottom(x))

      g.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y))

      g.append('g')
        .attr('clip-path', 'url(#clip)')
        .append('path')
        .datum(data)
        .attr('class', 'line')
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .on('start', tick)
    }
  },
  mounted() {
    this.getWindowWidth()
    this.init()
  }
}
</script>

<style scoped lang="scss">
div#graph {
  min-height: 400px;
  max-height: 500px;
  width: 100%;
}
</style>
