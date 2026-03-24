"use client";

import Image from "next/image";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { TEAM_INTRO, TEAM_MEMBERS } from "./teamData";

const INITIAL_COUNT = 3;
const BATCH_SIZE = 3;
const ACTION_BUTTON_BG = "#2d68e7";
const ACTION_BUTTON_TEXT = "#FFFFFF";

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const r = (num >> 16) + Math.round((255 - (num >> 16)) * percent);
  const g =
    ((num >> 8) & 0x00ff) + Math.round((255 - ((num >> 8) & 0x00ff)) * percent);
  const b = (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * percent);

  return (
    "#" +
    ((1 << 24) | (r << 16) | (g << 8) | b)
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TeamPortrait({ member }) {
  if (member.image) {
    return (
      <div
        className={`relative h-full min-h-[16rem] overflow-hidden ${member.accentClass} md:min-h-full`}
      >
        <Image
          src={member.image}
          alt={`Foto de ${member.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 18rem"
          className="object-contain object-bottom"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-full min-h-[16rem] items-end overflow-hidden ${member.accentClass} md:min-h-full`}
      aria-hidden="true"
    >
      <div className="px-6 pb-6">
        <span className="inline-flex h-16 w-16 items-center justify-center bg-black text-xl font-semibold text-white">
          {getInitials(member.name)}
        </span>
      </div>
    </div>
  );
}

function LinkedinBadge({ member }) {
  if (!member.linkedin) {
    return (
      <div className="inline-flex items-center rounded-full border border-black/10 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-black/35">
        Perfil pronto
      </div>
    );
  }

  return (
    <a
      href={member.linkedin}
      target="_blank"
      rel="noreferrer"
      aria-label={`LinkedIn de ${member.name}`}
      className="group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-[#2f3136] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[#0077b5]"
    >
      <FaLinkedin className="text-[2.15rem] leading-none" />
    </a>
  );
}

function TeamCard({ member }) {
  return (
    <article className="group overflow-hidden rounded-xl  border-black/10 border-[0.5px]  bg-white/85 backdrop-blur-sm transition-transform duration-300 md:grid md:grid-cols-[13.5rem_minmax(0,1fr)] md:items-stretch">
      <TeamPortrait member={member} />

      <div className="min-w-0 p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 md:gap-4">
            <div className="min-w-0">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[0.58rem] font-medium uppercase tracking-[0.14em] text-black/40 sm:text-[0.68rem] sm:tracking-[0.18em] md:text-[0.72rem] md:tracking-[0.2em]">
              {member.role}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black sm:text-[2rem]">
              {member.name}
            </h3>
          </div>

          <div className="flex items-start justify-self-end">
            <LinkedinBadge member={member} />
          </div>
        </div>

          <p className="max-w-4xl text-sm leading-6 text-black/72 sm:text-[0.98rem] sm:leading-7">
            {member.bio}
          </p>
        </div>
      </div>
    </article>
  );
}

function TeamActionButton({ children, onClick, variant = "solid" }) {
  const [hovered, setHovered] = useState(false);
  const isOutline = variant === "outline";
  const boxShadow = hovered
    ? isOutline
      ? "none"
      : `0 4px 16px 0 ${lightenColor(ACTION_BUTTON_BG, 0.7)}55`
    : "none";

  return (
    <button
      type="button"
      className="btn inline-flex min-w-[10rem] items-center justify-center transition-transform duration-200 ease-in-out hover:scale-105"
      style={{
        backgroundColor: isOutline ? "transparent" : ACTION_BUTTON_BG,
        color: isOutline ? "black" : ACTION_BUTTON_TEXT,
        border: `2px solid ${isOutline ? "#2d68e7" : ACTION_BUTTON_BG}`,
        boxShadow,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

export default function TeamShowcase({ mode = "section" }) {
  const isPage = mode === "page";
  const HeadingTag = isPage ? "h1" : "h2";
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleMembers = isPage
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.slice(0, visibleCount);
  const hasMore = visibleCount < TEAM_MEMBERS.length;
  const canCollapse = visibleCount > INITIAL_COUNT;

  return (
    <section
      id={isPage ? undefined : "team"}
      className={`${
        isPage ? "pb-20 pt-32 md:pt-40 lg:pt-44" : "py-20 md:py-28"
      } bg-[#ffffff] text-black`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 pb-10 md:grid-cols-[minmax(0,17rem)_1fr] md:items-end md:gap-10">
            <h2 className="text-[#006AEF] text-5xl md:text-6xl leading-tight">
            Equipo
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#006AEF] max-w-2xl">
            {TEAM_INTRO}
          </p>
        </div>

        <div className="mt-8 space-y-5 md:mt-10">
          {visibleMembers.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>

        {!isPage && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {canCollapse && (
              <TeamActionButton
                variant="outline"
                onClick={() => setVisibleCount(INITIAL_COUNT)}
              >
                VER MENOS
              </TeamActionButton>
            )}

            {hasMore && (
              <TeamActionButton
                onClick={() =>
                  setVisibleCount((current) =>
                    Math.min(current + BATCH_SIZE, TEAM_MEMBERS.length),
                  )
                }
              >
                VER MÁS
              </TeamActionButton>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
