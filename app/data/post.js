import { USERS } from "./users";

export const POSTS = [
  {
    imageUrl:
      "https://static.wikia.nocookie.net/disney/images/8/89/Big_Hero_6_film_poster.jpg/revision/latest/top-crop/width/360/height/360",
    user: USERS[0].user,
    likes: 3400,
    caption:
      "Making a fighting pose, lol. Definately, check this out. Amazingggg!!!",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "baymax",
        comment: "How do I look in the red suit? I love it.",
      },
      {
        user: "hiro",
        comment: "That looks dope, IMHO",
      },
    ],
  },
  {
    imageUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5298bac0-b8bf-4c80-af67-725c1272dbb0/dcevgjm-13dd91e6-77e0-4bf4-88de-1609b938bc75.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUyOThiYWMwLWI4YmYtNGM4MC1hZjY3LTcyNWMxMjcyZGJiMFwvZGNldmdqbS0xM2RkOTFlNi03N2UwLTRiZjQtODhkZS0xNjA5YjkzOGJjNzUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.KaE7FzLEa_PQ65EHtAgX_fy67QzTvIB-EwMUZp_x_hI",
    user: USERS[2].user,
    likes: 54530,
    caption: "Flying over Tokio City. Beautiful...",
    profile_picture: USERS[2].image,
    comments: [
      {
        user: "baymax",
        comment: "On a scale of 1 to 10, how do you rate the picture?",
      },
    ],
  },
];
