import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppLayout from "@/layout/AppLayout.jsx";
import PublicLayout from "@/layout/PublicLayout.jsx";
import AuthLayout from "@/layout/AuthLayout";

import PageLoader from "@/components/common/PageLoader.jsx";

const LoginPage = lazy(() => import('@/pages/auth/LoginPage.jsx'));

const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmailPage.jsx'));
const CreateUserAccountPage = lazy(() => import('@/pages/auth/CreateUserAccountPage.jsx'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage.jsx'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage.jsx'));
const ChangePasswordPage = lazy(() => import('@/pages/auth/ChangePasswordPage.jsx'));

const BoardPage = lazy(() => import('@/pages/board/BoardPage.jsx'));

import NotFound from "@/pages/NotFound.jsx";

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				index: true,
				element: <Suspense fallback={<PageLoader />}> <LoginPage /> </Suspense>
			},
			{
				element: <PublicLayout />,
				children: [
					{
						path: "login",
						element: <Suspense fallback={<PageLoader />}> <LoginPage /> </Suspense>
					},
					{
						path: "verify-email",
						element: <Suspense fallback={<PageLoader />}> <VerifyEmailPage /> </Suspense>
					},
					{
						path: "create-account",
						element: <Suspense fallback={<PageLoader />}> <CreateUserAccountPage /> </Suspense>
					},
					{
						path: "forgot-password",
						element: <Suspense fallback={<PageLoader />}> <ForgotPasswordPage /> </Suspense>
					},
					{
						path: "reset-password",
						element: <Suspense fallback={<PageLoader />}> <ResetPasswordPage /> </Suspense>
					}
				]
			},
			{
				element: <AuthLayout />,
				children: [
					{
						path: 'board',
						element: <Suspense fallback={<PageLoader />}> <BoardPage /> </Suspense>
					},
					{
						path: "change-password",
						element: <Suspense fallback={<PageLoader />}> <ChangePasswordPage /> </Suspense>
					}
				]
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	}
]);

export default router;