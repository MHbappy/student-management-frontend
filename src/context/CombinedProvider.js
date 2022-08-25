const CombinedProvider = ({ components = [], children, ...rest }) =>
  components.reduceRight((acc, Provider) => {
    return <Provider {...rest}>{acc}</Provider>;
  }, children);
export default CombinedProvider;
