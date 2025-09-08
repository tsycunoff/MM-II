import * as React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    fill="currentColor"
    preserveAspectRatio="xMidYMid slice"
    className={className}
    {...props}
  >
    <g
      transform="translate(0,1024) scale(0.1,-0.1)"
      fill="currentColor"
      stroke="none"
    >
      <path d="M2055 6760 c-96 -20 -198 -74 -262 -139 -18 -18 -45 -31 -72 -36 -24 -4 -79 -25 -123 -47 -108 -54 -182 -129 -237 -239 -37 -74 -48 -87 -88 -108 -140 -71 -242 -257 -243 -440 0 -49 -4 -58 -41 -98 -148 -161 -176 -482 -59 -667 31 -48 31 -50 16 -85 -74 -169 -24 -403 113 -535 49 -46 59 -62 70 -109 37 -169 186 -314 367 -361 34 -9 73 -16 87 -16 19 0 34 -11 55 -42 92 -134 226 -207 407 -223 52 -5 87 -2 135 11 54 14 127 18 425 23 l360 6 58 27 c73 34 137 87 183 150 34 45 186 367 213 450 13 38 201 242 433 468 l118 115 0 56 c0 63 -15 90 -102 192 l-50 57 58 66 c126 141 195 227 211 262 10 23 16 66 17 112 1 63 -3 84 -27 133 l-29 58 34 38 c18 21 46 41 61 45 16 3 60 36 98 73 106 102 108 96 -108 315 -98 99 -188 184 -201 189 -38 15 -79 -11 -198 -124 l-112 -106 -18 21 c-31 34 -94 58 -156 58 l-58 0 0 60 c0 56 1 60 24 60 31 0 70 32 86 69 7 19 11 62 9 115 -6 137 33 126 -455 126 -362 0 -415 -2 -428 -16 -12 -12 -16 -38 -16 -113 0 -110 9 -127 83 -151 l37 -12 0 -70 0 -71 -77 7 c-42 3 -97 6 -123 6 l-48 0 -4 108 c-3 91 -8 115 -30 157 -32 62 -103 130 -165 157 -51 22 -166 32 -228 18z m185 -142 c24 -13 58 -40 74 -61 l31 -39 0 -1301 0 -1302 -21 -40 c-30 -55 -64 -89 -115 -117 -60 -31 -197 -31 -279 0 -116 46 -207 144 -217 235 -6 49 13 95 66 161 48 60 39 116 -20 116 -52 0 -150 -136 -165 -230 -7 -40 -8 -41 -38 -34 -78 17 -139 48 -196 101 -113 104 -145 224 -96 363 38 106 36 168 -4 190 -20 11 -46 -21 -105 -131 l-34 -64 -30 65 c-51 108 -62 199 -35 289 29 99 104 150 190 131 55 -13 89 -53 134 -161 48 -113 83 -172 133 -222 36 -35 36 -35 15 -54 -32 -29 -58 -88 -58 -133 0 -38 2 -41 23 -35 12 4 56 26 97 49 113 64 136 71 227 69 128 -3 213 -49 254 -138 28 -61 24 -102 -16 -165 -19 -30 -35 -67 -35 -82 0 -26 3 -28 38 -28 118 0 186 157 131 304 -54 146 -211 235 -414 236 -105 0 -192 67 -248 190 -16 36 -42 94 -59 129 -52 116 -137 171 -262 171 -43 0 -76 -7 -113 -24 l-51 -24 -27 61 c-36 79 -45 203 -21 294 16 65 61 163 74 162 4 0 27 -32 52 -71 51 -80 118 -138 206 -180 96 -45 164 -54 307 -40 182 18 213 16 282 -17 102 -49 145 -112 145 -214 0 -44 -4 -54 -34 -82 -61 -57 -122 -54 -205 9 -43 32 -53 32 -86 3 -36 -30 -26 -65 32 -117 79 -70 180 -80 280 -30 66 33 106 76 128 141 43 120 -15 275 -135 363 l-56 42 33 34 c114 118 165 280 128 406 -50 176 -292 235 -331 80 -6 -26 -5 -28 17 -20 69 25 136 3 183 -60 66 -87 -26 -301 -159 -368 -32 -17 -162 -42 -173 -33 -1 1 5 19 14 41 26 62 16 162 -21 216 -39 56 -125 100 -206 106 -57 4 -59 3 -59 -20 0 -37 28 -68 85 -93 75 -34 98 -66 93 -133 -4 -39 -12 -61 -35 -90 -28 -34 -35 -37 -78 -35 -101 3 -221 97 -282 221 -25 51 -28 67 -28 162 0 95 3 111 28 162 47 96 160 178 244 178 37 0 87 -25 131 -65 39 -35 41 -35 51 -16 29 52 -1 130 -64 166 -23 14 -49 25 -58 25 -28 0 -29 20 -3 64 32 54 91 108 155 141 28 14 52 25 53 25 2 0 1 -25 0 -55 -9 -140 120 -260 254 -236 100 19 153 114 107 192 -22 38 -29 37 -43 -6 -30 -91 -159 -84 -190 11 -55 167 234 351 410 262z m1150 -28 l0 -30 -320 0 -320 0 0 30 0 30 320 0 320 0 0 -30z m-130 -220 l0 -60 -200 0 -200 0 0 60 0 60 200 0 200 0 0 -60z m785 -180 l130 -130 -24 -22 -23 -23 -90 95 c-142 151 -163 177 -148 195 7 8 15 15 19 15 3 0 65 -58 136 -130z m-67 -198 l35 -43 -26 -27 -27 -27 -125 125 -125 124 33 34 32 34 83 -89 c46 -48 100 -107 120 -131z m-480 179 c7 -4 109 -103 227 -220 136 -135 222 -229 235 -255 25 -52 26 -101 3 -144 -29 -51 -238 -285 -474 -529 l-138 -142 -58 60 c-71 75 -127 114 -201 142 -52 20 -83 22 -335 27 -152 3 -277 8 -277 13 0 4 0 189 0 412 l0 405 455 0 456 0 198 -200 c109 -110 204 -200 211 -200 24 0 50 33 50 62 0 24 -35 65 -207 243 l-208 214 -477 0 -478 1 0 65 0 65 503 -7 c276 -3 508 -9 515 -12z m292 -1162 c51 -58 53 -62 39 -85 -13 -21 -368 -384 -376 -384 -2 0 -3 22 -3 48 0 26 -7 74 -15 107 l-16 59 48 50 c106 113 258 266 264 266 3 0 30 -27 59 -61z m-809 -19 c284 -54 434 -377 301 -647 -53 -109 -180 -207 -300 -232 -30 -6 -153 -11 -284 -11 l-231 0 6 448 c4 246 7 448 7 449 1 8 458 1 501 -7z m189 -955 c0 -21 -60 -116 -98 -157 -83 -89 -90 -90 -387 -99 -143 -4 -262 -5 -264 -3 -2 2 6 26 18 54 12 28 25 73 28 100 l6 49 286 3 286 3 55 27 c57 27 70 32 70 23z"/>
      {/* …all the other <path> and <circle> elements copied verbatim… */}
    </g>
  </svg>
);


export const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 639"
    height="2em"
    width="auto"
    fill="currentColor"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
    {...props}
  >
    <g transform="translate(0,639) scale(0.1,-0.1)" fill="currentColor" stroke="none">
      <path d="M4507 5904 c-1 -1 -60 -4 -132 -7 -434 -20 -904 -179 -1285 -433 -658 -439 -1078 -1132 -1164 -1921 -60 -541 65 -1136 333 -1591 l30 -51 -236 -701 c-130 -385 -234 -703 -231 -705 2 -3 330 99 727 227 l723 231 92 -46 c276 -139 587 -232 901 -268 135 -15 436 -15 570 0 423 49 823 195 1177 430 466 311 828 769 1016 1291 69 191 106 341 138 566 21 144 24 502 5 644 -45 346 -156 694 -308 965 -424 755 -1159 1251 -2000 1350 -104 12 -348 25 -356 19z m339 -459 c938 -129 1690 -845 1864 -1773 52 -280 52 -536 0 -814 -123 -655 -541 -1222 -1130 -1536 -453 -242 -970 -315 -1485 -211 -211 43 -496 155 -680 269 -38 23 -74 43 -80 43 -5 0 -118 -35 -250 -77 -362 -116 -581 -186 -587 -186 -3 0 57 184 132 408 l138 408 -32 45 c-188 259 -328 631 -372 987 -20 164 -15 452 11 602 76 450 275 848 589 1177 483 506 1191 753 1882 658z"/>
      <path d="M3619 4550 c-60 -11 -124 -56 -194 -137 -110 -129 -162 -242 -186 -405 -28 -189 31 -431 157 -651 77 -134 246 -384 340 -502 104 -131 307 -337 419 -425 110 -87 243 -173 348 -226 124 -63 373 -165 503 -207 169 -55 221 -61 346 -43 123 19 160 31 271 88 113 59 215 160 245 243 28 76 52 187 52 243 0 31 -6 49 -22 65 -13 12 -104 66 -203 119 -378 202 -410 216 -457 205 -13 -4 -54 -44 -95 -94 -39 -48 -105 -123 -145 -166 -92 -97 -97 -98 -258 -17 -250 125 -432 269 -597 472 -67 81 -172 238 -209 310 -41 80 -36 94 69 207 92 99 147 185 147 228 0 11 -20 72 -44 135 -24 62 -71 190 -105 283 -75 205 -99 250 -143 263 -42 13 -192 20 -239 12z"/>
    </g>
  </svg>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

export const MessageSquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h10a2 2 0 012 2v10z" />
  </svg>
);

export const NotificationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export const CrmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const BirthdayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12v10H4V12M20 12l-2-5H6L4 12M20 12H4M12 12V4M12 4L8 8M12 4l4 4" />
    </svg>
);

export const ChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const ArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path>
    </svg>
);

export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
    </svg>
);