import {
  Bar,
  BarChart,
  Label,
  LabelList,
  Rectangle,
  ReferenceLine,
  XAxis,
  CartesianGrid,
  PieChart,
  Pie,
} from 'recharts'
import { TrendingUp } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from './ui/chart'
import {
  useCoursPlanChartHooks,
  useTopCategoryHooks,
  useLastWeekCheckoutHooks,
} from '../hooks/useDashboardSummaryHooks'

type LastWeekCheckout = {
  todayTotalAmount: number
  last7Days: { date: string; amount: number }[]
}

type CoursePlanChartItem = {
  month: string
  courses: number
  plans: number
}

type TopCategoryItem = {
  category: string
  courses: number
}

type ChartConfig = Record<string, { label: string; color: string }>

export function Charts() {
  const { coursePlanChartData } = useCoursPlanChartHooks() as {
    coursePlanChartData: CoursePlanChartItem[] | null
  }

  const { topCategoryData, chartConfig } = useTopCategoryHooks() as {
    topCategoryData: TopCategoryItem[] | null
    chartConfig: ChartConfig | null
  }

  const { lastWeekCheckoutData } = useLastWeekCheckoutHooks() as {
    lastWeekCheckoutData: LastWeekCheckout | null
  }

  const chartConfigBar: ChartConfig = {
    courses: {
      label: 'Course',
      color: 'hsl(var(--chart-1))',
    },
    plans: {
      label: 'Plans',
      color: 'hsl(var(--chart-2))',
    },
  }

  return (
    <div className="chart-wrapper">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {/* Steps Card */}
        <Card className="w-full">
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              ${lastWeekCheckoutData?.todayTotalAmount ?? 0}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                course sales
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                amount: {
                  label: 'amount',
                  color: 'hsl(var(--chart-1))',
                },
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: -4,
                  right: -4,
                }}
                data={lastWeekCheckoutData?.last7Days ?? []}
              >
                <Bar
                  dataKey="amount"
                  fill="var(--color-amount)"
                  radius={5}
                  fillOpacity={0.6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(value: string) =>
                    new Date(value).toLocaleDateString('en-US', {
                      weekday: 'short',
                    })
                  }
                />
                <ChartTooltip
                  defaultIndex={2}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value: string) =>
                        new Date(value).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      }
                    />
                  }
                  cursor={false}
                />
                <ReferenceLine
                  y={1200}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                >
                  <Label
                    position="insideBottomLeft"
                    value="Average Steps"
                    offset={10}
                    fill="hsl(var(--foreground))"
                  />
                  <Label
                    position="insideTopLeft"
                    value="12,343"
                    className="text-lg"
                    fill="hsl(var(--foreground))"
                    offset={10}
                    startOffset={100}
                  />
                </ReferenceLine>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>Weekly Course Sales</CardDescription>
            <CardDescription>
              Here is showing the weekly course sales
            </CardDescription>
          </CardFooter>
        </Card>

        {/* Courses + Plans Card */}
        <Card>
          <CardHeader>
            <CardTitle>Courses + Plans</CardTitle>
            <CardDescription>Last 6 Months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigBar}>
              <BarChart accessibilityLayer data={coursePlanChartData ?? []}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="courses"
                  stackId="a"
                  fill="var(--color-courses)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="plans"
                  stackId="a"
                  fill="var(--color-plans)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Summary of Course & Plan Checkout{' '}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total checkout for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* Top Categories Card */}
        <Card className="w-full">
          <CardHeader className="items-center pb-0">
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          {topCategoryData && chartConfig && (
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent nameKey="category" hideLabel />
                    }
                  />
                  <Pie
                    data={topCategoryData}
                    dataKey="courses"
                    nameKey="category"
                  >
                    <LabelList
                      dataKey="category"
                      className="fill-background"
                      stroke="none"
                      fontSize={10}
                      formatter={(value: React.ReactNode) => {
                        const val = String(value) // ép ReactNode sang string
                        const key = Object.keys(chartConfig).find(
                          configKey => chartConfig[configKey].label === val
                        )
                        return key ? chartConfig[key]?.label : val
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          )}
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
