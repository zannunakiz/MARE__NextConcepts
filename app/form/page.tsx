"use client";

import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  FileImage,
  FileUp,
  Loader2,
  Save,
  Send,
  UploadCloud,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, "Use at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .regex(/[A-Z]/, "Add one uppercase letter.")
    .regex(/[0-9]/, "Add one number.")
    .regex(/[^A-Za-z0-9]/, "Add one special character."),
  age: z.coerce.number().int().min(13, "Minimum age is 13.").max(100, "Enter a valid age."),
  role: z.string().min(1, "Choose a role."),
  skills: z.array(z.string()).min(1, "Choose at least one skill."),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  updates: z.boolean(),
  terms: z.boolean().refine(Boolean, "Accept the terms to continue."),
  bio: z.string().min(20, "Tell us a little more.").max(300, "Keep your bio under 300 characters."),
  startDate: z.string().min(1, "Choose a date."),
  notifications: z.boolean(),
  intensity: z.number().min(1).max(10),
});

type FormInput = z.input<typeof formSchema>;
type FormValues = z.output<typeof formSchema>;
type Submission = {
  status: string;
  message: string;
  statusCode: number;
  timestamp: string;
  data: FormValues & { avatar?: string; attachment?: string };
};

const defaults: FormValues = {
  fullName: "",
  email: "",
  password: "",
  age: 18,
  role: "",
  skills: [],
  experience: "beginner",
  updates: true,
  terms: false,
  bio: "",
  startDate: "",
  notifications: true,
  intensity: 5,
};

export default function FormPage() {
  const form = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaults,
    mode: "onBlur",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [avatar, setAvatar] = useState<{ name: string; url: string } | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const avatarInput = useRef<HTMLInputElement>(null);
  const attachmentInput = useRef<HTMLInputElement>(null);
  const errors = form.formState.errors;

  useEffect(() => {
    const draft = window.localStorage.getItem("mare-form-draft");
    if (draft) {
      form.reset(JSON.parse(draft));
    }
  }, [form]);

  const setAvatarFile = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) {
      return toast.error("Please choose an image file.");
    }
    setAvatar({ name: file.name, url: URL.createObjectURL(file) });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        payload.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
      });

      if (avatarInput.current?.files?.[0]) {
        payload.append("avatar", avatarInput.current.files[0]);
      }

      if (attachmentInput.current?.files?.[0]) {
        payload.append("attachment", attachmentInput.current.files[0]);
      }

      const result = await fetch("/api/form", { method: "POST", body: payload });
      const response = await result.json();

      if (!result.ok) {
        throw new Error(response.message ?? "Form submission failed");
      }

      setSubmission({
        status: "success",
        message: response.message,
        statusCode: result.status,
        timestamp: new Date().toISOString(),
        data: { ...data, avatar: avatar?.name, attachment: attachment?.name },
      });

      toast.success("Submit Success! Image successfully saved to Cloudinary, Data stored in database.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    window.localStorage.setItem("mare-form-draft", JSON.stringify(form.getValues()));
    toast.success("Draft saved locally");
  };

  const clearForm = () => {
    form.reset(defaults);
    setAvatar(null);
    setAttachment(null);
    setSubmission(null);
    toast("Form cleared");
  };

  const error = (name: keyof FormValues) => {
    return errors[name] ? (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-red-600"
      >
        {errors[name]?.message as string}
      </motion.p>
    ) : null;
  };

  const RequiredStar = () => <span className="ml-0.5 text-red-600">*</span>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-6 md:p-10"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <PageIntro
          eyebrow="Practice lab / forms"
          title="Build a complete form with confidence."
          description="Explore typed inputs, accessible controls, client-side validation, local drafts, file previews, and a simulated API response in one production-minded example."
        />
      </motion.div>

      <motion.form
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile details</CardTitle>
              <CardDescription>Required fields are marked with <span className="text-red-600">*</span>.</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="fullName">
                  Full name <RequiredStar />
                </Label>
                <Input
                  id="fullName"
                  placeholder="Richky Abednego"
                  disabled={isSubmitting}
                  {...form.register("fullName")}
                />
                {error("fullName")}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email <RequiredStar />
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Richky@example.com"
                  disabled={isSubmitting}
                  {...form.register("email")}
                />
                {error("email")}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">
                  Password <RequiredStar />
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="8+ chars, uppercase, number, symbol"
                  disabled={isSubmitting}
                  {...form.register("password")}
                />
                {error("password")}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="age">
                  Age <RequiredStar />
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="13"
                  max="100"
                  disabled={isSubmitting}
                  {...form.register("age")}
                />
                {error("age")}
              </div>

              <div className="grid gap-2">
                <Label>
                  Role <RequiredStar />
                </Label>
                <Controller
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="product">Product manager</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {error("role")}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="startDate">
                  Start date <RequiredStar />
                </Label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    className="pl-9"
                    disabled={isSubmitting}
                    {...form.register("startDate")}
                  />
                </div>
                {error("startDate")}
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="bio">
                  Short bio <RequiredStar />
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us what you are learning or building..."
                  className="min-h-28"
                  disabled={isSubmitting}
                  {...form.register("bio")}
                />
                {error("bio")}
              </div>

              <div className="grid gap-2">
                <Label>
                  Experience <RequiredStar />
                </Label>
                <Controller
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                      className="gap-2"
                    >
                      <label className="flex items-center gap-2 text-sm">
                        <RadioGroupItem value="beginner" />
                        Beginner
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <RadioGroupItem value="intermediate" />
                        Intermediate
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <RadioGroupItem value="advanced" />
                        Advanced
                      </label>
                    </RadioGroup>
                  )}
                />
                {error("experience")}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="skills">
                  Skills <RequiredStar />
                </Label>
                <select
                  id="skills"
                  multiple
                  className="min-h-28 rounded-md border bg-background px-3 py-2 text-sm"
                  disabled={isSubmitting}
                  value={form.watch("skills")}
                  onChange={(event) =>
                    form.setValue(
                      "skills",
                      Array.from(event.target.selectedOptions, (option) => option.value),
                      { shouldValidate: true }
                    )
                  }
                >
                  <option value="react">React</option>
                  <option value="nextjs">Next.js</option>
                  <option value="typescript">TypeScript</option>
                  <option value="design">UI design</option>
                  <option value="testing">Testing</option>
                </select>
                {error("skills")}
              </div>

              <div className="grid gap-3 sm:col-span-2">
                <Label>Learning intensity: {form.watch("intensity")}/10</Label>
                <Controller
                  control={form.control}
                  name="intensity"
                  render={({ field }) => (
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) =>
                        field.onChange(Array.isArray(value) ? value[0] : value)
                      }
                      disabled={isSubmitting}
                    />
                  )}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Gentle pace</span>
                  <span>Deep focus</span>
                </div>
              </div>

              <div className="grid gap-3 sm:col-span-2">
                <Label>Preferences</Label>
                <label className="flex items-center justify-between gap-4 rounded-lg border p-3 text-sm">
                  <span>
                    <span className="block font-medium">Product updates</span>
                    <span className="text-xs text-muted-foreground">
                      Receive occasional learning resources.
                    </span>
                  </span>
                  <Controller
                    control={form.control}
                    name="updates"
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </label>

                <label className="flex items-center justify-between gap-4 rounded-lg border p-3 text-sm">
                  <span>
                    <span className="block font-medium">Browser notifications</span>
                    <span className="text-xs text-muted-foreground">
                      Enable reminders for your practice sessions.
                    </span>
                  </span>
                  <Controller
                    control={form.control}
                    name="notifications"
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </label>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <Controller
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  )}
                />
                <div className="grid gap-1">
                  <Label htmlFor="terms">
                    I agree to the practice lab terms <RequiredStar />
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Your submission is validated on the server and saved securely in Neon.
                  </p>
                  {error("terms")}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 border-t sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={clearForm}
                disabled={isSubmitting}
              >
                <X />
                Clear form
              </Button>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={saveDraft}
                  disabled={isSubmitting}
                >
                  <Save />
                  Save draft
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send />
                      Submit form
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.aside
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Media inputs</CardTitle>
              <CardDescription>Preview files before submitting.</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-5">
              <div className="grid gap-2">
                <Label>Profile image</Label>
                <input
                  ref={avatarInput}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => setAvatarFile(event.target.files?.[0])}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => avatarInput.current?.click()}
                  className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-dashed bg-muted/30"
                  disabled={isSubmitting}
                >
                  <AnimatePresence mode="wait">
                    {avatar ? (
                      <motion.img
                        key="avatar"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        src={avatar.url}
                        alt="Selected profile preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      <motion.span
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-2 text-sm text-muted-foreground"
                      >
                        <FileImage />
                        Choose an image
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {avatar && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="truncate">{avatar.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setAvatar(null)}
                    >
                      <X />
                    </Button>
                  </motion.div>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Attachment</Label>
                <input
                  ref={attachmentInput}
                  type="file"
                  className="sr-only"
                  onChange={(event) => setAttachment(event.target.files?.[0] ?? null)}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => attachmentInput.current?.click()}
                  className="flex items-center gap-3 rounded-lg border p-3 text-left text-sm"
                  disabled={isSubmitting}
                >
                  <FileUp className="text-primary" />
                  <span className="min-w-0">
                    <span className="block font-medium">
                      {attachment ? attachment.name : "Choose a file"}
                    </span>
                    <span className="text-xs text-muted-foreground">PDF, DOCX, or TXT</span>
                  </span>
                </button>
              </div>

              <motion.div
                className={
                  "grid gap-2 rounded-lg border border-dashed p-5 text-center transition-colors " +
                  (dragging ? "border-primary bg-primary/10" : "bg-muted/20")
                }
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  setAttachment(event.dataTransfer.files[0] ?? null);
                }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <UploadCloud className="mx-auto text-primary" />
                <p className="text-sm font-medium">Drag and drop a file here</p>
                <p className="text-xs text-muted-foreground">
                  or use the attachment picker above
                </p>
              </motion.div>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg">Validation checklist</CardTitle>
              </CardHeader>

              <CardContent className="grid gap-3 text-sm">
                <p className="flex items-center gap-2">
                  <Check />
                  Strict email validation
                </p>
                <p className="flex items-center gap-2">
                  <Check />
                  Password strength rules
                </p>
                <p className="flex items-center gap-2">
                  <Check />
                  Accessible field errors
                </p>
                <p className="flex items-center gap-2">
                  <Check />
                  Zod Validation Library
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.aside>
      </motion.form>

      <AnimatePresence>
        {submission && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Simulated backend response</CardTitle>
                <CardDescription>
                  Rendered after the schema passed and the request completed.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <pre className="max-h-96 overflow-auto rounded-lg bg-muted p-4 font-mono text-xs leading-6">
                  {JSON.stringify(submission, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}