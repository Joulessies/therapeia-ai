"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Phone, MessageSquare, ExternalLink } from "lucide-react";

const CrisisAlert = ({ isVisible, onDismiss }) => {
  if (!isVisible) return null;

  const crisisResources = [
    {
      name: "Hopeline Philippines",
      number: "0917-558-4673",
      description: "24/7 suicide prevention hotline",
      action: "Call Now",
    },
    {
      name: "In Touch Crisis Lines",
      number: "8893-7603 / 8893-7604",
      description: "Mental health crisis support",
      action: "Call Now",
    },
    {
      name: "National Center for Mental Health",
      number: "8531-9000",
      description: "Mental health emergency services",
      action: "Call Now",
    },
    {
      name: "Emergency Services",
      number: "911 / 117",
      description: "For immediate medical emergencies",
      action: "Call 911",
    },
    {
      name: "Student Support Hotline",
      number: "0966-351-4518",
      description: "Specialized support for Filipino students",
      action: "Call Now",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-red-200 bg-red-50">
        <CardContent className="p-6">
          <Alert className="border-red-300 bg-red-100">
            <Shield className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">
              Student Crisis Support - Philippines
            </AlertTitle>
            <AlertDescription className="text-red-700">
              I'm concerned about what you've shared. As a student, please know
              that help is available and you don't have to face this alone,
              kabayan.
            </AlertDescription>
          </Alert>

          <div className="mt-4 space-y-3">
            <p className="text-sm text-red-700 font-medium">
              Immediate Help Resources:
            </p>

            {crisisResources.map((resource, index) => (
              <div
                key={index}
                className="p-3 bg-white rounded-lg border border-red-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900">
                      {resource.name}
                    </h4>
                    <p className="text-lg font-bold text-red-600">
                      {resource.number}
                    </p>
                    <p className="text-xs text-gray-600">
                      {resource.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="ml-2 bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      if (
                        resource.number.includes("0917") ||
                        resource.number.includes("8893") ||
                        resource.number.includes("8531") ||
                        resource.number.includes("911") ||
                        resource.number.includes("117") ||
                        resource.number.includes("0966")
                      ) {
                        window.location.href = `tel:${resource.number.replace(
                          /\D/g,
                          ""
                        )}`;
                      }
                    }}
                  >
                    {resource.number.includes("Text") ? (
                      <MessageSquare className="w-3 h-3 mr-1" />
                    ) : (
                      <Phone className="w-3 h-3 mr-1" />
                    )}
                    {resource.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-red-200">
            <p className="text-xs text-red-600 mb-3">
              Remember: You are not alone, and this pain is temporary.
              Professional help is available 24/7 in the Philippines. Your
              mental health matters, student!
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onDismiss}
                className="flex-1 border-red-300 text-red-700 hover:bg-red-100"
              >
                Continue Chat
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={() => (window.location.href = "tel:09175584673")}
              >
                <Phone className="w-3 h-3 mr-1" />
                Call Hopeline Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrisisAlert;
