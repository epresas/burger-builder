/**
 * Higher Order Component (HOC) that acts as a wrapper to 
 * allow returning of adyacent elements in JSX and also add
 * extra functionality if required.
 * @param {Object} props 
 * @return {Void}
 */
const aux = (props) => props.children;

export default aux;
