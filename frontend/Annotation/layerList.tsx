import React, { useState, useEffect, useContext, Component } from "react";
import styled from "styled-components";
import { LayerItem } from "./layerItem";
import { clickContext } from "./index";

const LayerWrapper = styled.div`
  position: absolute;
  list-style: none;
  bottom: 0;
  left: 0;
  height: ${props => props.h};
  width: ${props => props.w};
`;

interface IProps {
  h: number;
  w: number;
  l: number;
  regions: any;
}

interface IState {
  hwList: any;
}

export class LayerList extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      hwList: null
    };
  }

  componentDidUpdate(prevProps) {
    const { h, w, l } = this.props;
    if (prevProps.h !== h && h > 0 && w > 0) {
      const hNum = Math.ceil(h / l),
        wNum = Math.ceil(w / l);

      const hList = new Array<number>(hNum).fill(0).map((_, i) => i * l);
      const wList = new Array<number>(wNum).fill(0).map((_, i) => i * l);

      this.setState({
        hwList: hList.map(x => wList.map(y => [x, y])).flat()
      });
    }
  }

  render() {
    const { hwList } = this.state;
    const { h, w, l, regions } = this.props;
    const layerList =
      regions &&
      hwList &&
      hwList.map(hw => (
        <li key={String(hw[0]) + String(hw[1])}>
          <LayerItem
            clicked={this.props.regions.some(
              i => i.y === hw[0] && i.x === hw[1]
            )}
            top={hw[0]}
            left={hw[1]}
            length={l}
          />
        </li>
      ));
    return (
      <LayerWrapper h={h} w={w}>
        {layerList}
      </LayerWrapper>
    );
  }
}

// Ref使用のためClassに書き換え

// export const LayerList = props => {
//   const [hwList, setHWList] = useState([]);
//   const { h, w, l } = props;
//   const regions = useContext(clickContext);

//   // create height and width list
//   useEffect(() => {
//     console.log(regions);

//     if (h <= 0 || w <= 0) return;

//     // console.log(regions)

//     const hNum = Math.ceil(h / l),
//       wNum = Math.ceil(w / l);

//     const hList = new Array<number>(hNum).fill(0).map((_, i) => i * l);
//     const wList = new Array<number>(wNum).fill(0).map((_, i) => i * l);

//     setHWList(hList.map(x => wList.map(y => [x, y])).flat());
//   }, [h]);

//   const layerList = hwList.map(hw => {
//     return (
//       <li key={String(hw[0]) + String(hw[1])}>
//         <LayerItem
//           clicked={regions.some(i => i.y === hw[0] && i.x === hw[1])}
//           top={hw[0]}
//           left={hw[1]}
//           length={l}
//         />
//       </li>
//     );
//   });

//   return (
//     <LayerWrapper h={h} w={w}>
//       {layerList}
//     </LayerWrapper>
//   );
// };
