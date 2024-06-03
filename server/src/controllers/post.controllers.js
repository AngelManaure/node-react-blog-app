import prisma from "../db.js";

export const getPosts = async (req, res) => {
    try {
    const posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              username: true
            }
          }
        }
      });
    if (!posts) {
        return res.status(404).json({ message: "ha ocurrido un error al obtener todas las publicaciones" })
    } else {
        res.status(200).json(posts)
    }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const myPosts = async (req, res) => {
    try {
        const postsFound = await prisma.post.findMany({
            where: {
                authorId: req.user.id
            }
        });
        if (!postsFound) {
            return res.status(404).json({ message: "Error al obtener las publicaciones del usuario" })
        } else {
            res.status(200).json(postsFound)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const postFound = await prisma.post.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                author: {
                  select: {
                    username: true
                  }
                },
                comments: {
                  include: {
                    author: {
                      select: {
                        username: true
                      }
                    }
                  }
                }
              }
        });
        if (!postFound) {
            return res.status(404).json({ message: "publicacion no encontrada" })
        } else {
            res.status(200).json(postFound)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, description } = req.body;
    try {
        const postCreated = await prisma.post.create({
            data: {
                title: title,
                description: description,
                authorId: req.user.id,
            }
        });
        if (!postCreated) {
            return res.status(404).json({ message: "ha ocurrido un error al intentar crear la publicacion" })
        } else {
            res.status(200).json(postCreated)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        const postUpdated = await prisma.post.update({
            where: {
                id: parseInt(req.params.id),
                authorId: req.user.id
            },
            data: req.body
        });
        if (!postUpdated) {
            return res.status(404).json({ message: "publicacion a actualizar no encontrada" })
        } else {
            res.status(200).json(postUpdated)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const postDeleted = await prisma.post.delete({
            where: {
                id: parseInt(req.params.id),
                authorId: req.user.id
            }
        });
        if (!postDeleted) {
            return res.status(404).json({ message: "publicacion a eliminar no encontrada" })
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//comentarios

export const updateCommentByPostAndId = async (req, res) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;
  
    try {
      // Verifica si el comentario existe y está asociado al post
      const comment = await prisma.comment.findFirst({
        where: {
          id: Number(commentId),
          postId: Number(postId),
        },
      });
  
      if (!comment) {
        return res.status(404).json({ error: 'comentario no encontrado o no asociado con esta publicacion' });
      }
  
      const updatedComment = await prisma.comment.update({
        where: {
          id: Number(commentId),
        },
        data: {
          content,
        },
      });
  
      res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

export const getCommentByPostAndId = async (req, res) => {
    const { postId, commentId } = req.params;
  
    try {
      const comment = await prisma.comment.findFirst({
        where: {
          id: Number(commentId),
          postId: Number(postId),
        },
        include: {
          author: {
            select: {
              username: true
            }
          }
        }
      });
  
      if (!comment) {
        return res.status(404).json({ error: 'comentario no encontrado o no asociado con esta publicacion' });
      }
  
      res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

export const createComment = async (req, res) => {
    const { description } = req.body
    try {
        const postFound = await prisma.post.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if (!postFound) {
            return res.status(404).json({ message: "Publicacion no encontrada" })
        } else {
            const commentCreated = await prisma.comment.create({
                data: {
                    description: description,
                    postId: parseInt(req.params.id),
                    authorId: req.user.id
                }
            });
            res.status(200).json(commentCreated)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCommentByPostAndId = async (req, res) => {
    const { postId, commentId } = req.params;
  
    try {
      const comment = await prisma.comment.findFirst({
        where: {
          id: Number(commentId),
          postId: Number(postId),
        },
      });
  
      if (!comment) {
        return res.status(404).json({ error: 'comentario no encontrado, o no esta asociado con la publicacion' });
      }
  
      await prisma.comment.delete({
        where: {
          id: Number(commentId),
        },
      });
      
      res.sendStatus(204)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

export const getPostsWithMostComments = async (req, res) => {
    try {
      const postsWithMostComments = await prisma.post.findMany({
        orderBy: {
          comments: {
            _count: 'desc'
          }
        },
        take: 5
      });
  
      res.status(200).json(postsWithMostComments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };