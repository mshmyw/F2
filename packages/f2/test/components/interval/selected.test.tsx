import { jsx } from '../../../src/jsx';
import { Canvas, Chart, Interval, Axis } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';

const data = [
  { a: '1', genre: 'Sports', sold: 275 },
  { a: '1', genre: 'Strategy', sold: 115 },
  { a: '1', genre: 'Action', sold: 120 },
  { a: '1', genre: 'Shooter', sold: 350 },
  { a: '1', genre: 'Other', sold: 110 },
];

describe('数据选中', () => {
  it('柱图-单选', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            selection={{
              // type: 'multiple',
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: {
                fillOpacity: 1,
              },
              unSelectedStyle: {
                fillOpacity: 0.4,
              },
              cancelable: true,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });

  it('柱图-单选, 不可取消', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            selection={{
              // type: 'multiple',
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: {
                fillOpacity: 1,
              },
              unSelectedStyle: {
                fillOpacity: 0.4,
              },
              cancelable: false,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });

  it('柱图-style 为函数', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            selection={{
              // type: 'multiple',
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: (record) => {
                const { xMin, xMax } = record;
                const width = xMax - xMin;
                const offset = width * 0.1;
                return {
                  x: xMin - offset,
                  width: width + offset * 2,
                };
              },
              unSelectedStyle: () => {
                return {
                  fillOpacity: 0.4,
                };
              },
              cancelable: false,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });

  it('柱图-多选', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            selection={{
              type: 'multiple',
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: {
                fillOpacity: 1,
              },
              unSelectedStyle: {
                fillOpacity: 0.4,
              },
              cancelable: true,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });

  it('饼图', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart
          data={data}
          coord={{
            radius: 0.8,
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval
            x="a"
            y="sold"
            adjust="stack"
            color="genre"
            selection={{
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: (record) => {
                const { yMax, yMin } = record;
                return {
                  r: (yMax - yMin) * 1.1,
                };
              },
              unSelectedStyle: {},
              cancelable: true,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 选中
    await gestureSimulator(context.canvas, 'click', { x: 144, y: 68 });
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 144, y: 68 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });
});
