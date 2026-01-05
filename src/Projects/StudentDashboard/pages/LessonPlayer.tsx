import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  Clock,
  CheckCircle,
  BookOpen,
  FileText,
  Download,
} from 'lucide-react';
import { useLearning } from '@/Projects/StudentDashboard/contexts/LearningContext';
import { Button } from '@/Projects/StudentDashboard/components/ui/button';
import { useState } from 'react';
import { cn } from '@/Projects/StudentDashboard/lib/utils';

export default function LessonPlayer() {
  const { lessonId } = useParams();
  const { lessons, updateLessonProgress, addXp } = useLearning();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] =
    useState<'playlist' | 'notes' | 'resources'>('playlist');

  const currentLesson = lessons.find(l => l.id === lessonId);
  const otherLessons = lessons.filter(l => l.id !== lessonId);

  if (!currentLesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-display font-bold mb-2">
          Lesson not found
        </h2>
        <p className="text-muted-foreground mb-6">
          The lesson you're looking for doesn't exist.
        </p>

        {/* 🔧 FIX: route back to dashboard, not landing page */}
        <Link to="/dashboard">
          <Button className="bg-gradient-primary">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const handleCompleteLesson = () => {
    updateLessonProgress(currentLesson.id, 100);
    addXp(50);
  };

  return (
    <div className="max-w-7xl space-y-6 animate-fade-in">

      {/* 🔧 FIX: Back button should go to /dashboard */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Video Section */}
        <div className="lg:col-span-2 space-y-4">

          {/* Video Player */}
          <div className="aspect-video bg-card rounded-2xl overflow-hidden relative group">
            <iframe
              src={currentLesson.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Overlay Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary-glow transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  )}
                </button>

                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary rounded-full"
                    style={{ width: `${currentLesson.progress}%` }}
                  />
                </div>

                <span className="text-sm text-muted-foreground">
                  {currentLesson.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                  {currentLesson.category}
                </span>
                <h1 className="text-2xl font-display font-bold mt-3">
                  {currentLesson.title}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {currentLesson.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                <Clock className="w-4 h-4" />
                {currentLesson.duration}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Your Progress</span>
                <span className="font-semibold text-primary">
                  {currentLesson.progress}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${currentLesson.progress}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {currentLesson.isCompleted ? (
                <Button disabled className="flex-1 gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </Button>
              ) : (
                <Button
                  onClick={handleCompleteLesson}
                  className="flex-1 bg-gradient-primary hover:opacity-90 gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Complete (+50 XP)
                </Button>
              )}

              <Button variant="outline" className="gap-2">
                <SkipForward className="w-4 h-4" />
                Next Lesson
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          {/* Tabs */}
          <div className="glass-card rounded-xl p-1 flex">
            {(['playlist', 'notes', 'resources'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize',
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass-card rounded-2xl overflow-hidden">

            {activeTab === 'playlist' && (
              <div className="divide-y divide-border max-h-[500px] overflow-y-auto">

                {/* Current Lesson */}
                <div className="p-4 bg-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-primary">
                        {currentLesson.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {currentLesson.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 🔧 FIX: playlist links must include /dashboard */}
                {otherLessons.map(lesson => (
                  <Link
                    key={lesson.id}
                    to={`/dashboard/learn/${lesson.id}`}
                    className="p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors"
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        lesson.isCompleted
                          ? 'bg-success/10'
                          : 'bg-muted'
                      )}
                    >
                      {lesson.isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <Play className="w-4 h-4 text-muted-foreground ml-0.5" />
                      )}
                    </div>

                    <div>
                      <p className="font-medium text-sm">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {lesson.duration}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm">Lesson Notes</span>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Downloadable Resources</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
