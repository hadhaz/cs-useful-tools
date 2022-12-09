import React, { useEffect, useState, useRef } from "react";

type ReturnTuple = [
  string,
  React.MutableRefObject<HTMLElement>,
  React.MutableRefObject<HTMLElement>
];

const useMinHeight = (): ReturnTuple => {
    const [clearance, setClearance] = useState<string>('calc(100vh - 0px)');

    const lower = useRef() as React.MutableRefObject<HTMLElement>;
    const upper = useRef() as React.MutableRefObject<HTMLElement>;

    useEffect(() => {
        const offset = upper?.current?.offsetHeight + lower?.current?.offsetHeight;
        setClearance(`calc(100vh - ${offset}px)`);
    }, [upper, lower]);

    return [clearance, upper, lower];
}

export default useMinHeight;