import React from "react";

interface Props {
  counter: number;
}

const countTest = ({ counter }: Props) => {
  return <div>{counter}</div>;
};

let counter = 0;
export const getServerSideProps = () => {
  return {
    props: {
      counter: counter++,
    },
  };
};

export default countTest;
