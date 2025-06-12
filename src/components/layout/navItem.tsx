import {
  faLink,
  faPaintBrush,
  faChartBar,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const navItems = [
  { label: "Link saya", icon: faLink, path: "/dashboard" },
  { label: "Desain", icon: faPaintBrush, path: "/dashboard/design" },
  { label: "Produk", icon: faStore, path: "/dashboard/product" },
  { label: "Statistik", icon: faChartBar, path: "/dashboard/statistic" },
];
