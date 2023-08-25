import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={205}
    height={336}
    viewBox="0 0 205 336"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="206" rx="3" ry="3" width="205" height="16" />
    <rect x="1" y="227" rx="3" ry="3" width="205" height="61" />
    <rect x="0" y="293" rx="3" ry="3" width="78" height="42" />
    <circle cx="101" cy="101" r="101" />
    <rect x="108" y="293" rx="3" ry="3" width="98" height="42" />
  </ContentLoader>
);
