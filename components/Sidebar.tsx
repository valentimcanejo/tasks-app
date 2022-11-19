"use client";
import { useContext, useEffect, useRef, useState } from "react";

import {
  GruposIcon,
  LogoutIcon,
  PedidosIcon,
  ProjetosIcon,
  UsuarioIcon,
} from "./icons";
import { HomeIcon } from "./icons";
import { LeftArrow } from "./icons";
import SidebarItem from "./SidebarItem";
import Link from "next/link";
import { useRouter } from "next/router";
import useWindowSize from "../hooks/useWindowSize";

interface ConteudoPros {
  children?: any;
}

export default function Sidebar({ children }: ConteudoPros) {
  const [open, setOpen] = useState<boolean>(
    typeof window !== "undefined" && localStorage.getItem("sidebar") === "true"
      ? true
      : false
  );
  const windowWidth = useWindowSize();

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (windowWidth) {
          if (
            ref.current &&
            !ref.current.contains(event.target) &&
            windowWidth <= 640
          ) {
            setOpen(false);
          }
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, windowWidth]);
  }

  useOutsideAlerter(wrapperRef);

  const [update, setUpdate] = useState(true);

  const updateOpen = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("sidebar") === "true") {
        localStorage.setItem("sidebar", "false");
      } else {
        localStorage.setItem("sidebar", "true");
      }
      setUpdate(!update);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("sidebar") === "true") {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [update]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        (windowWidth !== undefined && windowWidth <= 640) ||
        localStorage.getItem("sidebar") === "false"
      ) {
        setOpen(false);
      } else if (localStorage.getItem("sidebar") === "true") {
        setOpen(true);
      }
    }
  }, [windowWidth]);

  return (
    <div className="flex  h-screen">
      {windowWidth && windowWidth <= 640 && !open ? null : (
        <div
          ref={wrapperRef}
          className={` ${open ? "w-72" : "w-12 "} bg-secondary  p-5 ${
            windowWidth && windowWidth <= 640 ? "fixed h-screen" : "sticky"
          }  z-50 top-0 pt-8 duration-300`}
        >
          <div
            className={`absolute cursor-pointer  w-7
             ${!open ? "rotate-180 right-8 top-64 mt-8" : "right-2 bottom-20"}`}
            onClick={updateOpen}
          >
            {LeftArrow}
          </div>
          <Link href={{ pathname: "/tasks" }} className="no-underline">
            <div className="flex gap-x-4 ml-2 text-white items-center">
              <div
                className={`cursor-pointer duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              >
                {HomeIcon}
              </div>

              <h1
                className={`text-white origin-left cursor-pointer font-medium text-xl duration-200 ${
                  !open && "scale-0"
                }`}
              >
                Home
              </h1>
            </div>
          </Link>
          <ul className="pt-4 pl-0">
            <SidebarItem
              texto="Tarefas"
              url="/tasks"
              icone={ProjetosIcon}
              open={open}
            />

            <SidebarItem
              texto="Sprints"
              url="/tasks"
              icone={UsuarioIcon}
              open={open}
            />
          </ul>
        </div>
      )}
      <div
        className={`overflow-x-auto w-screen static py-5 lg:px-5 sm:px-0 px-0 shadow-md sm:rounded-lg`}
      >
        {windowWidth && windowWidth <= 640 ? (
          <button
            onClick={() => setOpen(!open)}
            className="btn ml-4 mb-2 fixed z-40 btn-primary btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        ) : null}
        <div className={`${windowWidth && windowWidth <= 640 ? "mt-8" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
