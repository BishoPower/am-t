"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Ban, Clock, Shield } from "lucide-react";
import { BanStatus } from "@/lib/ban-utils";

interface BanNoticeProps {
  banStatus: BanStatus;
  showAppealOption?: boolean;
  onAppeal?: () => void;
}

export default function BanNotice({
  banStatus,
  showAppealOption = false,
  onAppeal,
}: BanNoticeProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    if (!banStatus.banExpiresAt) return;

    const updateTimeRemaining = () => {
      const now = new Date();
      const expiry = new Date(banStatus.banExpiresAt!);
      const diff = expiry.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining("Ban has expired");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeRemaining(
          `${days} day${days !== 1 ? "s" : ""}, ${hours} hour${
            hours !== 1 ? "s" : ""
          }`
        );
      } else if (hours > 0) {
        setTimeRemaining(
          `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${
            minutes !== 1 ? "s" : ""
          }`
        );
      } else {
        setTimeRemaining(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [banStatus.banExpiresAt]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const isPermanent = !banStatus.banExpiresAt;

  return (
    <Card className="max-w-2xl mx-auto border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-red-800">
          <Ban className="h-6 w-6" />
          Account Suspended
          <Badge variant="destructive" className="ml-auto">
            {isPermanent ? "Permanent" : "Temporary"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-white border border-red-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-800 mb-2">
              Your account has been suspended
            </h3>
            <p className="text-red-700 text-sm">
              You currently cannot access most features of this platform due to
              a violation of our community guidelines.
            </p>
          </div>
        </div>

        {banStatus.banReason && (
          <div className="p-4 bg-white border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">
              Reason for suspension:
            </h4>
            <p className="text-red-700">{banStatus.banReason}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banStatus.bannedAt && (
            <div className="p-3 bg-white border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800 text-sm">
                  Suspended On
                </span>
              </div>
              <p className="text-red-700 text-sm">
                {formatDate(banStatus.bannedAt)}
              </p>
            </div>
          )}

          {banStatus.banExpiresAt && (
            <div className="p-3 bg-white border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800 text-sm">
                  {isPermanent ? "Status" : "Expires On"}
                </span>
              </div>
              {isPermanent ? (
                <p className="text-red-700 text-sm font-medium">
                  Permanent Suspension
                </p>
              ) : (
                <div>
                  <p className="text-red-700 text-sm">
                    {formatDate(banStatus.banExpiresAt)}
                  </p>
                  {timeRemaining && (
                    <p className="text-red-600 text-xs mt-1">
                      {timeRemaining} remaining
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {!isPermanent && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              After your suspension expires:
            </h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Your account will be automatically reactivated</li>
              <li>• You'll regain access to all platform features</li>
              <li>• Please ensure you follow our community guidelines</li>
            </ul>
          </div>
        )}

        {showAppealOption && onAppeal && (
          <div className="pt-4 border-t border-red-200">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div>
                <h4 className="font-semibold text-red-800">
                  Think this is a mistake?
                </h4>
                <p className="text-red-700 text-sm">
                  You can submit an appeal for review.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={onAppeal}
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Submit Appeal
              </Button>
            </div>
          </div>
        )}

        <div className="text-center pt-4 border-t border-red-200">
          <p className="text-red-600 text-sm">
            For questions about your suspension, please contact our support
            team.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
