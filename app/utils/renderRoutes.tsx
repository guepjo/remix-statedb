import React from "react";
/* eslint-disable react/jsx-props-no-spreading */
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { AppRoute } from "~/routes";

const Fallback = (): JSX.Element => (
  <div
    style={{
      display: "flex",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spin tip="Loading..." />
  </div>
);

export const renderRoutes = (
  routes: AppRoute[],
  extraProps = {}
): React.ReactNode => {
  return routes ? (
    <Routes>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          element={
            <React.Suspense fallback={<Fallback />}>
              <route.component />
            </React.Suspense>
          }
        />
      ))}
    </Routes>
  ) : null;
};
