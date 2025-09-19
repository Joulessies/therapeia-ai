"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  Loader2,
  Shield,
  Heart,
} from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      return "Please enter your first and last name";
    }
    if (!formData.email || !formData.email.includes("@")) {
      return "Please enter a valid email address";
    }
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    if (!acceptedTerms) {
      return "Please accept the Terms of Service";
    }
    if (!acceptedPrivacy) {
      return "Please accept the Privacy Policy";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate signup API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, show success message
      setSuccess(
        "Account created successfully! Please check your email to verify your account."
      );

      // In a real app, you would:
      // 1. Call your registration API
      // 2. Send verification email
      // 3. Redirect to verification page or login
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    setIsLoading(true);
    // In a real app, you would integrate with OAuth providers
    setTimeout(() => {
      setSuccess(`Redirecting to ${provider} signup...`);
      setIsLoading(false);
    }, 1000);
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6)
      return { strength: 1, label: "Weak", color: "text-red-500" };
    if (password.length < 10)
      return { strength: 2, label: "Fair", color: "text-yellow-500" };
    if (password.length < 12)
      return { strength: 3, label: "Good", color: "text-blue-500" };
    return { strength: 4, label: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image
              src="/images/logo.png"
              alt="Therapeia Logo"
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-teal-700 mb-2">
            Start Your Journey
          </h1>
          <p className="text-gray-600">
            Create your account for personalized mental health support
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center text-gray-800">
              Create Your Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social Signup Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-11 border-gray-200 hover:bg-gray-50"
                onClick={() => handleSocialSignup("Google")}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </Button>

              <Button
                variant="outline"
                className="w-full h-11 border-gray-200 hover:bg-gray-50"
                onClick={() => handleSocialSignup("GitHub")}
                disabled={isLoading}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Sign up with GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or create account with email
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 h-11"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="pl-10 h-11"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-11"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-11"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-full ${
                            level <= passwordStrength.strength
                              ? passwordStrength.strength === 1
                                ? "bg-red-500"
                                : passwordStrength.strength === 2
                                ? "bg-yellow-500"
                                : passwordStrength.strength === 3
                                ? "bg-blue-500"
                                : "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-xs ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-11"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500">
                      Passwords do not match
                    </p>
                  )}
              </div>

              {/* Terms and Privacy Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={setAcceptedTerms}
                    disabled={isLoading}
                    className="mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-5"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-teal-600 hover:text-teal-700 hover:underline"
                      target="_blank"
                    >
                      Terms of Service
                    </Link>{" "}
                    and understand that Therapeia AI is a supportive tool and
                    not a replacement for professional medical care.
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={acceptedPrivacy}
                    onCheckedChange={setAcceptedPrivacy}
                    disabled={isLoading}
                    className="mt-1"
                  />
                  <label
                    htmlFor="privacy"
                    className="text-sm text-gray-600 leading-5"
                  >
                    I acknowledge that I have read and agree to the{" "}
                    <Link
                      href="/privacy"
                      className="text-teal-600 hover:text-teal-700 hover:underline"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and consent to the processing of my data for mental health
                    support services.
                  </label>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-teal-800">
                      Your Privacy is Protected
                    </h4>
                    <p className="text-xs text-teal-700 mt-1">
                      All your data is encrypted and stored securely. We never
                      share your personal information with third parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Create My Account
                  </>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-teal-600 hover:text-teal-700 font-medium hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center mt-8 space-x-4">
          <Link
            href="/privacy"
            className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
          >
            Terms of Service
          </Link>
          <Link
            href="/support"
            className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
          >
            Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
