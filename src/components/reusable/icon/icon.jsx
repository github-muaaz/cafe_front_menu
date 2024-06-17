import { Menu } from "./icons/menu";
import {Language} from "./icons/language";
import {Search} from "./icons/search";
import {Tables} from "./icons/tables";
import {Foods} from "./icons/foods";
import {Category} from "./icons/category";
import {Pen} from "./icons/pen";
import {Orders} from "./icons/orders";
import {Role} from "./icons/role";
import {Users} from "./icons/users";
import {Scanner} from "./icons/scanner";
import {Cart} from "./icons/cart";
import {Desert} from "./icons/desert";
import {Fish} from "./icons/fish";
import {Fruit} from "./icons/fruit";
import {Drink} from "./icons/drink";
import {FastFood} from "./icons/fast-food";
import {Bucket} from "./icons/bucket";
import {X} from "./icons/x";
import {Dot} from "./icons/dot";
import {Logout} from "./icons/logout";
import {Logo} from "./icons/logo";
import {Stop} from "./icons/stop";
import {Done} from "./icons/done";
import {Up} from "./icons/up";
import {Down} from "./icons/down";
import {Dots} from "./icons/dots";
import {Delete} from "./icons/delete";

const Icon = ({ icon, color, pointer, ...rest }) => {

    const icons= {
        menu: <Menu style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest} />,
        search: <Search style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest} />,
        language: <Language style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest} />,
        tables: <Tables style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        foods: <Foods style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        food: <Foods style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        category: <Category style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        pen: <Pen style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        orders: <Orders style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        role: <Role style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        users: <Users style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        products: <Foods style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        scanner: <Scanner style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        cart: <Cart style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        desert: <Desert style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        fish: <Fish style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        fruit: <Fruit style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        drink: <Drink style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        fast_food: <FastFood style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        bucket: <Bucket style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        x: <X style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        dot: <Dot style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        logout: <Logout style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        logo: <Logo style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        stop: <Stop style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        done: <Done style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        up: <Up style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        down: <Down style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        dots: <Dots style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
        delete: <Delete style={{cursor: pointer ? "pointer" : ""}} stroke={color} {...rest}/>,
    };

    return icons[icon];
};

export default Icon;
