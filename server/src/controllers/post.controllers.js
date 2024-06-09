import prisma from "../db.js";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Comentarios y/o publicaciones ofensivas

const offensiveWordsPath = path.join(__dirname, 'offensiveWords.json');
let offensiveWords = [];

// Función para leer el archivo offensiveWords.json y cargar las palabras ofensivas en memoria
const loadOffensiveWords = async () => {
  try {
    const data = await fs.readFile(offensiveWordsPath, 'utf8');
    offensiveWords = JSON.parse(data).words;
  } catch (error) {
    console.error('Error loading offensive words:', error);
    offensiveWords = []; // Establecer a un array vacío en caso de error
  }
};

// Llamar a la función de carga de palabras ofensivas al iniciar el servidor
loadOffensiveWords();

// Función para verificar si un texto contiene palabras ofensivas
const containsOffensiveWord = (text) => {
  const lowerCaseText = text.toLowerCase();
  return offensiveWords.some((word) => lowerCaseText.includes(word));
};



export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!posts) {
      return res
        .status(404)
        .json({
          message: "ha ocurrido un error al obtener todas las publicaciones",
        });
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsWithMostComments = async (req, res) => {
  try {
    const postsWithMostComments = await prisma.post.findMany({
      orderBy: {
        comments: {
          _count: "desc",
        },
      },
      take: 10,
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(200).json(postsWithMostComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const myPosts = async (req, res) => {
  try {
    const postsFound = await prisma.post.findMany({
      where: {
        authorId: req.user.id,
      },
    });
    if (!postsFound) {
      return res
        .status(404)
        .json({ message: "Error al obtener las publicaciones del usuario" });
    } else {
      res.status(200).json(postsFound);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const postFound = await prisma.post.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
    if (!postFound) {
      return res.status(404).json({ message: "publicacion no encontrada" });
    } else {
      res.status(200).json(postFound);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, description } = req.body;

  // Verificar si la publicacion contiene palabras ofensivas
  const hasOffensiveWord = containsOffensiveWord(title) || containsOffensiveWord(description);

  if (hasOffensiveWord) {
    return res.status(400).json({ message: "ofensa" });
  }

  try {
    const postCreated = await prisma.post.create({
      data: {
        title: title,
        description: description,
        authorId: req.user.id,
      },
    });
    if (!postCreated) {
      return res
        .status(404)
        .json({
          message: "ha ocurrido un error al intentar crear la publicacion",
        });
    } else {
      res.status(200).json(postCreated);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {

  const { title, description } = req.body;

  // Verificar si el título o la descripción contienen palabras ofensivas
  const hasOffensiveWord = containsOffensiveWord(title) || containsOffensiveWord(description);

  if (hasOffensiveWord) {
    return res.status(400).json({ message: "ofensa" });
  }

  try {
    const postUpdated = await prisma.post.update({
      where: {
        id: parseInt(req.params.id),
        authorId: req.user.id,
      },
      data: req.body,
    });
    if (!postUpdated) {
      return res
        .status(404)
        .json({ message: "publicacion a actualizar no encontrada" });
    } else {
      res.status(200).json(postUpdated);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postDeleted = await prisma.post.delete({
      where: {
        id: parseInt(req.params.id),
        authorId: req.user.id,
      },
    });
    if (!postDeleted) {
      return res
        .status(404)
        .json({ message: "publicacion a eliminar no encontrada" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reportPost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);

    // Incrementar el contador de denuncias
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        reports: {
          increment: 1, // Incrementar el contador en 1
        },
      },
    });

    res.status(200).json({ message: "Post denunciado exitosamente", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//comentarios

// export const updateCommentByPostAndId = async (req, res) => {
//   const { postId, commentId } = req.params;
//   const { content } = req.body;

//   const hasOffensiveWord = await containsOffensiveWord(title) || await containsOffensiveWord(description);

//   if (hasOffensiveWord) {
//       return res.status(400).json({ message: "ofensa" });
//   }

//   try {
//     // Verifica si el comentario existe y está asociado al post
//     const comment = await prisma.comment.findFirst({
//       where: {
//         id: Number(commentId),
//         postId: Number(postId),
//       },
//     });

//     if (!comment) {
//       return res
//         .status(404)
//         .json({
//           error: "comentario no encontrado o no asociado con esta publicacion",
//         });
//     }

//     const updatedComment = await prisma.comment.update({
//       where: {
//         id: Number(commentId),
//       },
//       data: {
//         content,
//       },
//     });

//     res.json(updatedComment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const createComment = async (req, res) => {
  const { description } = req.body;

  // Verificar si el comentario contiene palabras ofensivas
  const hasOffensiveWord = containsOffensiveWord(description);

  if (hasOffensiveWord) {
    return res.status(400).json({ message: "ofensa" });
  }

  try {
    // Crear el comentario
    const commentCreated = await prisma.comment.create({
      data: {
        description: description,
        postId: parseInt(req.params.id),
        authorId: req.user.id,
      },
    });

    res.status(200).json(commentCreated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// export const createComment = async (req, res) => {
//   const { description } = req.body;

//   const hasOffensiveWord = await containsOffensiveWord(description);

//   if (hasOffensiveWord) {
//       return res.status(400).json({ message: "ofensa" });
//   }

//   try {
//     const postFound = await prisma.post.findUnique({
//       where: {
//         id: parseInt(req.params.id),
//       },
//     });
//     if (!postFound) {
//       return res.status(404).json({ message: "Publicacion no encontrada" });
//     } else {
//       const commentCreated = await prisma.comment.create({
//         data: {
//           description: description,
//           postId: parseInt(req.params.id),
//           authorId: req.user.id,
//         },
//       });
//       res.status(200).json(commentCreated);
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteCommentByPostAndId = async (req, res) => {
//   const { postId, commentId } = req.params;

//   try {
//     const comment = await prisma.comment.findFirst({
//       where: {
//         id: Number(commentId),
//         postId: Number(postId),
//       },
//     });

//     if (!comment) {
//       return res
//         .status(404)
//         .json({
//           error:
//             "comentario no encontrado, o no esta asociado con la publicacion",
//         });
//     }

//     await prisma.comment.delete({
//       where: {
//         id: Number(commentId),
//       },
//     });

//     res.sendStatus(204);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

//buscador

export const searchQuery = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res
        .status(400)
        .json({ message: "el parametro query 'q' es requerido" });
    }
    const posts = await prisma.post.findMany();

    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filteredPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
