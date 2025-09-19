"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Heart,
  Target,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  ArrowLeft,
  Star,
  Headphones,
  Wind,
  Eye,
  Smile,
  Zap,
  Moon,
  Sun,
  Activity,
  BookOpen,
} from "lucide-react";

const ExercisesPage = () => {
  const [activeExercise, setActiveExercise] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);

  const exerciseCategories = [
    {
      id: "breathing",
      title: "Breathing Exercises",
      description:
        "Calm your mind and reduce anxiety with guided breathing techniques",
      icon: Wind,
      color: "bg-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      exercises: [
        {
          id: "4-7-8",
          title: "4-7-8 Breathing",
          description:
            "A powerful technique to reduce anxiety and promote sleep",
          duration: "5 min",
          difficulty: "Beginner",
          benefits: ["Reduces anxiety", "Improves sleep", "Lowers stress"],
          instructions: [
            "Sit comfortably with your back straight",
            "Exhale completely through your mouth",
            "Inhale through your nose for 4 counts",
            "Hold your breath for 7 counts",
            "Exhale through your mouth for 8 counts",
            "Repeat this cycle 4 times",
          ],
        },
        {
          id: "box-breathing",
          title: "Box Breathing",
          description: "Used by Navy SEALs to maintain calm under pressure",
          duration: "8 min",
          difficulty: "Beginner",
          benefits: [
            "Improves focus",
            "Reduces stress",
            "Enhances performance",
          ],
          instructions: [
            "Sit in a comfortable position",
            "Exhale all air from your lungs",
            "Inhale for 4 counts",
            "Hold for 4 counts",
            "Exhale for 4 counts",
            "Hold empty for 4 counts",
            "Repeat for 5-10 cycles",
          ],
        },
        {
          id: "belly-breathing",
          title: "Diaphragmatic Breathing",
          description: "Deep breathing that activates the relaxation response",
          duration: "10 min",
          difficulty: "Beginner",
          benefits: [
            "Activates parasympathetic system",
            "Reduces cortisol",
            "Improves oxygen flow",
          ],
          instructions: [
            "Lie down or sit comfortably",
            "Place one hand on chest, one on belly",
            "Breathe slowly through your nose",
            "Feel your belly rise more than your chest",
            "Exhale slowly through pursed lips",
            "Continue for 10-15 breaths",
          ],
        },
      ],
    },
    {
      id: "mindfulness",
      title: "Mindfulness Exercises",
      description: "Develop present-moment awareness and reduce mental chatter",
      icon: Eye,
      color: "bg-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      exercises: [
        {
          id: "body-scan",
          title: "Body Scan Meditation",
          description: "Progressive relaxation technique to release tension",
          duration: "15 min",
          difficulty: "Beginner",
          benefits: [
            "Releases physical tension",
            "Improves body awareness",
            "Promotes relaxation",
          ],
          instructions: [
            "Lie down comfortably",
            "Close your eyes and breathe naturally",
            "Start at the top of your head",
            "Notice sensations without judgment",
            "Slowly move attention down your body",
            "Spend 30 seconds on each body part",
            "End at your toes",
          ],
        },
        {
          id: "5-4-3-2-1",
          title: "5-4-3-2-1 Grounding",
          description:
            "Quick technique to anchor yourself in the present moment",
          duration: "3 min",
          difficulty: "Beginner",
          benefits: [
            "Reduces anxiety",
            "Grounds in present",
            "Stops panic attacks",
          ],
          instructions: [
            "Notice 5 things you can see",
            "Notice 4 things you can touch",
            "Notice 3 things you can hear",
            "Notice 2 things you can smell",
            "Notice 1 thing you can taste",
            "Take three deep breaths",
          ],
        },
        {
          id: "loving-kindness",
          title: "Loving-Kindness Meditation",
          description: "Cultivate compassion for yourself and others",
          duration: "12 min",
          difficulty: "Intermediate",
          benefits: [
            "Increases self-compassion",
            "Reduces self-criticism",
            "Improves relationships",
          ],
          instructions: [
            "Sit comfortably and close your eyes",
            "Start with yourself: 'May I be happy and healthy'",
            "Think of a loved one: 'May you be happy and healthy'",
            "Think of a neutral person: 'May you be happy and healthy'",
            "Think of someone difficult: 'May you be happy and healthy'",
            "Extend to all beings: 'May all beings be happy and healthy'",
          ],
        },
      ],
    },
    {
      id: "cognitive",
      title: "Cognitive Exercises",
      description:
        "Challenge negative thought patterns and build mental resilience",
      icon: Brain,
      color: "bg-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      borderColor: "border-teal-200",
      exercises: [
        {
          id: "thought-challenging",
          title: "Thought Challenging",
          description: "Question and reframe negative automatic thoughts",
          duration: "10 min",
          difficulty: "Intermediate",
          benefits: [
            "Reduces negative thinking",
            "Improves mood",
            "Builds resilience",
          ],
          instructions: [
            "Identify a negative thought",
            "Ask: 'Is this thought realistic?'",
            "Ask: 'What evidence supports/contradicts this?'",
            "Ask: 'How would I advise a friend?'",
            "Create a balanced, realistic thought",
            "Write down the new perspective",
          ],
        },
        {
          id: "gratitude-practice",
          title: "Gratitude Practice",
          description: "Shift focus to positive aspects of life",
          duration: "7 min",
          difficulty: "Beginner",
          benefits: [
            "Improves mood",
            "Increases life satisfaction",
            "Reduces depression",
          ],
          instructions: [
            "Think of 3 things you're grateful for today",
            "Be specific about why you're grateful",
            "Feel the emotion of gratitude",
            "Think of someone who helped you",
            "Consider sending them a thank you message",
            "Notice how gratitude feels in your body",
          ],
        },
        {
          id: "worry-time",
          title: "Scheduled Worry Time",
          description: "Contain worrying to a specific time period",
          duration: "15 min",
          difficulty: "Intermediate",
          benefits: [
            "Reduces constant worry",
            "Improves focus",
            "Creates boundaries",
          ],
          instructions: [
            "Set aside 15 minutes for worrying",
            "Write down all your current worries",
            "For each worry, ask: 'Can I control this?'",
            "For controllable worries, make an action plan",
            "For uncontrollable worries, practice acceptance",
            "When worries arise later, remind yourself of your scheduled time",
          ],
        },
      ],
    },
    {
      id: "relaxation",
      title: "Relaxation Techniques",
      description:
        "Physical and mental techniques to reduce stress and tension",
      icon: Moon,
      color: "bg-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200",
      exercises: [
        {
          id: "progressive-muscle",
          title: "Progressive Muscle Relaxation",
          description: "Systematically tense and relax muscle groups",
          duration: "20 min",
          difficulty: "Beginner",
          benefits: [
            "Reduces physical tension",
            "Improves sleep",
            "Lowers blood pressure",
          ],
          instructions: [
            "Lie down comfortably",
            "Start with your toes - tense for 5 seconds",
            "Release and notice the relaxation",
            "Move up to calves, thighs, abdomen",
            "Continue with hands, arms, shoulders",
            "Finish with face and head muscles",
            "End with whole body relaxation",
          ],
        },
        {
          id: "visualization",
          title: "Guided Visualization",
          description: "Use imagery to create a peaceful mental state",
          duration: "12 min",
          difficulty: "Beginner",
          benefits: ["Reduces stress", "Improves mood", "Enhances creativity"],
          instructions: [
            "Close your eyes and breathe deeply",
            "Imagine a peaceful, safe place",
            "Use all your senses - what do you see, hear, smell?",
            "Notice the temperature and textures",
            "Feel completely safe and relaxed",
            "Stay in this place for several minutes",
            "Slowly return to the present moment",
          ],
        },
      ],
    },
  ];

  const startExercise = (exercise) => {
    setActiveExercise(exercise);
    setIsPlaying(true);
    setProgress(0);

    // Simulate progress
    const duration = parseInt(exercise.duration) * 60; // Convert to seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          setCompletedExercises((prev) => [...prev, exercise.id]);
          return 100;
        }
        return prev + 100 / duration;
      });
    }, 1000);
  };

  const pauseExercise = () => {
    setIsPlaying(!isPlaying);
  };

  const resetExercise = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const ExercisePlayer = ({ exercise }) => (
    <Card className="mb-6 border-2 border-teal-200 bg-teal-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-teal-800 flex items-center gap-2">
            <Target className="w-5 h-5" />
            {exercise.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveExercise(null)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-teal-700">Progress</span>
            <span className="text-sm font-medium text-teal-800">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={pauseExercise}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button
              variant="outline"
              onClick={resetExercise}
              className="border-teal-300 text-teal-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="bg-white p-4 rounded-lg border border-teal-200">
            <h4 className="font-medium text-teal-800 mb-2">Instructions:</h4>
            <ol className="space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="text-sm text-teal-700 flex items-start"
                >
                  <span className="font-medium mr-2">{index + 1}.</span>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {progress === 100 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-green-800">Exercise Complete!</h3>
              <p className="text-sm text-green-700">
                Great job completing this exercise.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (activeExercise) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <ExercisePlayer exercise={activeExercise} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-16 h-16 mr-4">
              <Image
                src="/images/logo.png"
                alt="Therapeia Logo"
                width={64}
                height={64}
                className="w-full h-full"
              />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-teal-700 mb-2">
                Therapeutic Exercises
              </h1>
              <p className="text-xl text-gray-600">
                Evidence-based techniques for mental wellness
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Practice scientifically-proven exercises designed to reduce stress,
            manage anxiety, improve mood, and build mental resilience. Choose
            from breathing techniques, mindfulness practices, cognitive
            exercises, and relaxation methods.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="border-l-4 border-l-teal-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Today</p>
                  <p className="text-2xl font-bold text-teal-600">
                    {completedExercises.length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available Exercises</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {exerciseCategories.reduce(
                      (total, cat) => total + cat.exercises.length,
                      0
                    )}
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {exerciseCategories.length}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Weekly Streak</p>
                  <p className="text-2xl font-bold text-green-600">5 days</p>
                </div>
                <Zap className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exercise Categories */}
        <div className="space-y-12">
          {exerciseCategories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center mb-6">
                <div
                  className={`p-3 rounded-full ${category.color} text-white mr-4`}
                >
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {category.title}
                  </h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.exercises.map((exercise) => (
                  <Card
                    key={exercise.id}
                    className={`transition-all hover:shadow-lg ${category.borderColor} ${category.bgColor}`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle
                            className={`text-lg ${category.textColor}`}
                          >
                            {exercise.title}
                            {completedExercises.includes(exercise.id) && (
                              <CheckCircle className="w-5 h-5 text-green-500 inline ml-2" />
                            )}
                          </CardTitle>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {exercise.duration}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {exercise.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                        {exercise.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-800 mb-2">
                          Benefits:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {exercise.benefits.map((benefit, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-gray-300 text-gray-600"
                            >
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        className={`w-full ${category.color} hover:${category.color}/90 text-white`}
                        onClick={() => startExercise(exercise)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Exercise
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-teal-800 mb-2">
                Need More Support?
              </h3>
              <p className="text-teal-700 mb-4">
                These exercises work best when combined with regular therapy
                sessions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/therapy/chat">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Brain className="w-4 h-4 mr-2" />
                    Chat with AI Therapist
                  </Button>
                </Link>
                <Link href="/therapy">
                  <Button
                    variant="outline"
                    className="border-teal-300 text-teal-700"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Therapy Hub
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
