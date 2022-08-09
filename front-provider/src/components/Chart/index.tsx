import ApexChart from 'react-apexcharts'

import { Container } from './styles'

interface ChartProps {
  title: string
  days: Array<string | Date>
  data: Array<number>
}

export function Chart({ title, days, data }: ChartProps): JSX.Element {
  const series = [
    {
      name: 'series-1',
      data
    }
  ]

  return (
    <Container>
      <span>{title}</span>
      <ApexChart
        options={{
          chart: {
            id: 'basic-bar',
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            },
            foreColor: '#3D94EF'
          },
          xaxis: {
            type: 'datetime',
            axisBorder: {
              color: '#3D94EF'
            },
            axisTicks: {
              color: '#3D94EF'
            },
            categories: days
          },
          grid: {
            show: false
          },
          dataLabels: {
            enabled: false
          },
          tooltip: {
            enabled: false
          },
          fill: {
            opacity: 0.3,
            type: 'gradient',
            colors: ['#2DD09E'],
            gradient: {
              shade: 'dark',
              opacityFrom: 0.7,
              opacityTo: 0.3
            }
          },
          colors: ['#2DD09E']
        }}
        series={series}
        type="area"
        width="100%"
        height="100%"
      />
    </Container>
  )
}
