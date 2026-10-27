/** Its own module so `MotionProvider` can `import()` it: the animation engine then ships as a
 *  separate chunk instead of inside every page's first load. `domMax`, not `domAnimation`,
 *  because the navbar's sliding pill (`layoutId`, `layoutScroll`) is a layout animation and the
 *  navbar is on every page. */
export { domMax as default } from "framer-motion";
