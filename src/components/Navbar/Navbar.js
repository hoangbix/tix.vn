import { Fragment, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { Popover, Transition, Menu } from "@headlessui/react";
import { useDispatch } from "react-redux";
import {
  UserOutlined,
  HistoryOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  BookmarkAltIcon,
  CalendarIcon,
  MenuIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
  HomeIcon,
  FilmIcon,
  NewspaperIcon,
} from "@heroicons/react/outline";

import logo from "../../assets/images/logo.png";
import "./navbar.scss";
import { TOKEN } from "../../util/config";

const solutions = [
  {
    name: "Trang chủ",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Cụm rạp",
    href: "#",
    icon: FilmIcon,
  },
  {
    name: "Tin tức",
    href: "#",
    icon: NewspaperIcon,
  },
  {
    name: "Ứng dụng",
    href: "#",
    icon: ViewGridIcon,
  },
];

const resources = [
  {
    name: "Lịch sử đặt vé",
    href: "#",
    icon: SupportIcon,
  },
  {
    name: "Chính sách bảo mật",
    href: "#",
    icon: BookmarkAltIcon,
  },
  {
    name: "Sự kiện HOT",
    href: "#",
    icon: CalendarIcon,
  },
  {
    name: "Quy định",
    href: "#",
    icon: ShieldCheckIcon,
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const dispatch = useDispatch();
  const localStor = JSON.parse(localStorage.getItem("USER_LOCAL"));
  const handelLogout = () => {
    localStorage.removeItem("USER_LOCAL");
    localStorage.removeItem(TOKEN);
    dispatch({ type: "DANG_XUAT" });
    window.location.reload();
  };

  return (
    <>
      <Popover className="relative navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14">
          <div className="flex justify-between items-center border-gray-100 py-2 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <span className="sr-only">Tix.vn</span>
                <img className="h-8 w-auto sm:h-10" src={logo} alt="" />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Mở menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              <Link
                to="/"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Trang chủ
              </Link>

              <Link
                to=""
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Cụm rạp
              </Link>
              <Link
                to=""
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Tin tức
              </Link>

              <Link
                to=""
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Ứng dụng
              </Link>
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {localStor?.taiKhoan === undefined ? (
                <Link
                  to="/login"
                  className="whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Đăng nhập / Đăng ký
                </Link>
              ) : (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md   px-4 py-2  text-sm font-medium text-gray-700  focus:outline-none">
                      Xin chào, {localStor?.hoTen}
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="info__icon origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              <UserOutlined />
                              Trang cá nhân
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              <HistoryOutlined />
                              Lịch sử đặt vé
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              <EditOutlined />
                              Chỉnh sửa thông tin
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm info__logout"
                              )}
                              onClick={handelLogout}
                            >
                              <LogoutOutlined />
                              Đăng xuất
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>
        </div>
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-1 pb-3 px-3">
                <div className="flex items-center justify-between">
                  <div>
                    <img className="h-10 w-auto" src={logo} alt="Workflow" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Đóng menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-4">
                  <nav className="grid gap-y-8">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <item.icon
                          className="flex-shrink-0 h-6 w-6 text-indigo-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-900 menu__mob">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {resources.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div>
                  {localStor?.taiKhoan === undefined ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => {
                          dispatch({ type: "CHUYEN_HUONG" });
                        }}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Đăng ký
                      </Link>
                      <p className="mt-6 text-center font-medium text-gray-500">
                        Đã có tài khoản?{" "}
                        <Link
                          to="/login"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Đăng nhập
                        </Link>
                      </p>
                    </>
                  ) : (
                    <p className="mt-6 text-center text-sm font-medium text-gray-500">
                      Xin chào,{" "}
                      <Link
                        to="/"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        {localStor?.hoTen}
                      </Link>
                      <div className="pt-3" onClick={handelLogout}>
                        Đăng Xuất
                      </div>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <Outlet />
    </>
  );
}
