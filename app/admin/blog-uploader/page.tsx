import LoginForm from "./LoginForm";
import UploadForm from "./UploadForm";
import { isAuthenticated } from "./actions";

export const metadata = {
  title: "Blog Uploader · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminBlogUploaderPage() {
  const authed = await isAuthenticated();
  return authed ? <UploadForm /> : <LoginForm />;
}
