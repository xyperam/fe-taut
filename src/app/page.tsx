"use client";
import Navbar from "@/components/landingPage/navbar";
import { Button } from "@/components/ui/button";
import { InputWithPrefix } from "@/components/ui/input";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="flex flex-col items-center justify-center text-center px-4 py-20 gap-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-purple-700">
          All Your Links, One Wizz ✨
        </h1>

        <p className="text-lg md:text-xl max-w-xl text-gray-600">
          So many links, so little space?{" "}
          <span className="font-semibold">POOF 💥</span> — Wizz gathers them all
          into one magical portal.
        </p>

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Claim your username
          </h2>

          <form className="flex flex-col sm:flex-row items-center gap-4">
            <InputWithPrefix
              prefix="wizzlink.id/"
              type="text"
              placeholder="yourname"
              className="w-72"
            />
            <Button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 h-10 rounded-md shadow"
            >
              Claim
            </Button>
          </form>
        </div>

        <div className="mt-10">
          {/* <Image
            width={300}
            height={600}
            src="/images/banner1.jpg"
            alt="Wizz Link Preview"
            className=" object-cover"
          /> */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Image
              width={300}
              height={600}
              src="/images/banner1.jpg"
              alt="Wizz Link Preview"
              className=" object-cover"
            />
          </motion.div>
        </div>
      </section>
      <footer className="bg-white border-t mt-10 py-10 px-6 text-sm text-gray-600">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-purple-600 mb-2">Wizz Link</h3>
            <p>
              Magical bio link for creators, streamers, and digital wizards ✨
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold mb-2">Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="/features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold mb-2">Social</h4>
            <div className="flex gap-4">
              {/* Ganti dengan icon button */}
              <a href="https://twitter.com" target="_blank">
                Twitter
              </a>
              <a href="https://discord.gg" target="_blank">
                Discord
              </a>
              <a href="https://youtube.com" target="_blank">
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-400">
          © 2025 WizzScript. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
