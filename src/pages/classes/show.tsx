import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ClassDetails } from "@/types";
import { useShow } from "@refinedev/core";
import { AdvancedImage } from "@cloudinary/react";
import React from "react";
import { bannerPhoto } from "@/lib/cloudinary";

const Show = () => {
  const { query } = useShow<ClassDetails>({ resource: "classes" });
  const classDetail = query.data?.data;
  const { isLoading, isError } = query;

  if (isLoading || isError || !classDetail) {
    return (
      <ShowView className="class-view class-show">
        <ShowViewHeader resource="classes" title="Class Detail" />

        <p className="state-message">
          {isLoading
            ? "Loading class detail..."
            : isError
            ? "Error loading class detail"
            : "Class detail not found"}
        </p>
      </ShowView>
    );
  }

  const teacherName = classDetail.teacher?.name || "N/A";
  const teacherInitials = teacherName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
  const placeHolderUrl = `https://placehold.co/600x400?text=${encodeURIComponent(
    teacherInitials || "N/A",
  )}`;

  return (
    <ShowView className="class-view class-show">
      <ShowViewHeader resource="classes" title="Class Detail" />
      <div className="banner">
        {classDetail.bannerUrl ? (
          <AdvancedImage
            alt="Banner Image"
            cldImg={bannerPhoto(
              classDetail.bannerCldPubId ?? "",
              classDetail.name,
            )}
          />
        ) : (
          <div className="placeholder" />
        )}
      </div>

      <Card className="details-card">
        <div className="details-header">
          <div>
            <h1>{classDetail.name}</h1>
            <p>{classDetail.description}</p>
          </div>

          <div>
            <Badge variant={"outline"}>{classDetail.capacity} spots</Badge>

            <Badge
              variant={
                classDetail.status === "active" ? "default" : "secondary"
              }
              data-status={classDetail.status}
            >
              {classDetail.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="details-grid">
          <div className="instructor">
            <p>Instructor</p>

            <div>
              <img
                src={classDetail.teacher?.image ?? placeHolderUrl}
                alt={teacherName}
              />

              <div>
                <p>{teacherName}</p>
                <p>{classDetail.teacher?.email}</p>
              </div>
            </div>
          </div>
          <div className="department">
            <p>Department</p>

            <div>
              <p>{classDetail.department?.name} </p>
              <p>{classDetail.department?.description}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="subject">
          <p>Subject</p>

          <div>
            <Badge variant={"outline"}>Code: {classDetail.subject?.name}</Badge>
            <p>{classDetail.subject?.name}</p>
            <p>{classDetail.subject?.description}</p>
          </div>
        </div>

        <Separator />

        <div className="join">
          <h2>Join Class</h2>

          <ol>
            <li>Ask your teacher for the invite code</li>
            <li>CLick on "Join Class" button</li>
            <li>Past the code and click "Join"</li>
          </ol>
        </div>

        <Button className="w-full" size={"lg"}>
          Join Class
        </Button>
      </Card>
    </ShowView>
  );
};

export default Show;
