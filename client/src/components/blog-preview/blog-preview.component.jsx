import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteBlogByTitle,
  setBlogNotificationMessage,
} from "../../store/blog/blog.slice";
import { selectBlogPost } from "../../store/blog/blog.selector";
import { fetchTitles } from "../../api-requests/requests";
import MessageToast from "../toast/toast.component";
import { selectProfile } from "../../store/profile/profile.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import {
  BlogLink,
  BlogLinkContainer,
  DeleteBlogButton,
} from "./blog-preview.styles";

import { ResourceNotFoundError } from "../../api-requests/request-errors/errors";

const BlogPreview = () => {
  const [blogTitles, setBlogTitles] = useState([]);
  const dispatch = useDispatch();
  const blog = useSelector(selectBlogPost);
  const profile = useSelector(selectProfile);
  const currentUser = useSelector(selectCurrentUser);
  const [isOwnProfile, setIsOwnProfile] = useState(
    currentUser.userName === profile.userName
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getTitles = async () => {
      try {
        const titles = await fetchTitles(profile.userName);
        setBlogTitles(titles);
        setIsOwnProfile(currentUser.userName === profile.userName);
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          navigate("../../404", { replace: true });
        }

        dispatch(setBlogNotificationMessage(error.message));
      }
    };
    getTitles();
  }, [dispatch, profile.userName, currentUser.userName, navigate]);

  const handleDelete = (e) => {
    const title = e.target.dataset.title;

    const payload = {
      title,
      navigateToResourceNotFoundPage: () => navigate("../../404"),
    };
    dispatch(deleteBlogByTitle(payload))
      .unwrap()
      .then((successMessage) => {
        const updatedBlogTitles = blogTitles.filter(
          (blogTitle) => blogTitle.title !== title
        );
        setBlogTitles(updatedBlogTitles);
        dispatch(setBlogNotificationMessage(successMessage));
      })
      .catch((errorMessage) =>
        dispatch(setBlogNotificationMessage(errorMessage))
      );
  };

  if (!blogTitles.length) {
    return (
      <p>{`${
        currentUser?.userName === profile.userName
          ? `You have not posted any blog yet. Posts that you make will appear here. `
          : `${profile.userName} has not posted any blog`
      }`}</p>
    );
  }

  return (
    <div>
      {blogTitles.map((blogTitle) => (
        <BlogLinkContainer key={blogTitle.title}>
          <BlogLink
            key={blogTitle.title}
            to={
              blog.isLoading
                ? "#"
                : `../../blog/${blogTitle.titleSlug}/${blogTitle.id}`
            }
          >
            {blogTitle.title}
          </BlogLink>
          {isOwnProfile && (
            <DeleteBlogButton disabled={blog.isLoading}>
              <i
                onClick={handleDelete}
                data-title={blogTitle.title}
                className="bi bi-trash"
              ></i>
            </DeleteBlogButton>
          )}
        </BlogLinkContainer>
      ))}
      {blog.notification && <MessageToast message={blog.notification} />}
    </div>
  );
};

export default BlogPreview;
