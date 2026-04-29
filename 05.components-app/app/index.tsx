import {
  animationMenuRoutes,
  menuRoutes,
  uiMenuRoutes,
} from "@/constants/Routes";
import MenuItem from "@/presentation/menu/MenuItem";
import ThemedView from "@/presentation/shared/ThemedView";
import React from "react";
import { View } from "react-native";

const ComponentsApp = () => {
  return (
    <ThemedView margin>
      {animationMenuRoutes.map((route, index) => (
        // <Link key={route.name} href={`./${route.name.split("/")[0]}`}>
        //   {route.title}
        // </Link>
        <MenuItem
          key={route.name}
          title={route.title}
          icon={route.icon}
          name={route.name}
          isFirst={index === 0}
          isLast={index === animationMenuRoutes.length - 1}
        />
      ))}

      <View className="my-3" />

      {uiMenuRoutes.map((route, index) => (
        // <Link key={route.name} href={`./${route.name.split("/")[0]}`}>
        //   {route.title}
        // </Link>
        <MenuItem
          key={route.name}
          title={route.title}
          icon={route.icon}
          name={route.name}
          isFirst={index === 0}
          isLast={index === uiMenuRoutes.length - 1}
        />
      ))}

      <View className="my-3" />

      {menuRoutes.map((route, index) => (
        // <Link key={route.name} href={`./${route.name.split("/")[0]}`}>
        //   {route.title}
        // </Link>
        <MenuItem
          key={route.name}
          title={route.title}
          icon={route.icon}
          name={route.name}
          isFirst={index === 0}
          isLast={index === menuRoutes.length - 1}
        />
      ))}
    </ThemedView>
  );
};

export default ComponentsApp;
