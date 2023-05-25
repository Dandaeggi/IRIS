import classNames from "classnames";
import React from "react";
import contextOpensub from "../openSubContextApi";

import ControlButton from "./ControlButton";

type Props = {
  platform: string;
  tooltips?: boolean;
};

const closePath =
  "M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z";

const ResponseControls: React.FC<Props> = (props) => {
  return (
    <section
      className={classNames(
        "window-titlebar-controls",
        `type-${props.platform}`
      )}
    >
      <ControlButton
        name="close"
        onClick={() => contextOpensub.hideSub()}
        path={closePath}
        title={props.tooltips ? "Close" : null}
      />
    </section>
  );
};

export default ResponseControls;
