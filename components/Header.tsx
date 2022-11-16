"use client";

import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
interface HeaderProps {
  titulo: string;
}

export default function Header({ titulo }: HeaderProps) {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex justify-between mx-2">
      <p className="text-2xl sm:text-xl md:text-xl lg:text-2xl font-bold leading-normal text-base-content">
        {titulo}
      </p>
      <div className="flex justify-center place-items-center">
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <select data-choose-theme className="select select-bordered fa">
          <option value="light" className="fa">
            &#xf185;
          </option>
          <option value="dark" className="fa">
            &#xf186;
          </option>
        </select>
      </div>
    </div>
  );
}
