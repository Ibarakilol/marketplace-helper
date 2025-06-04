import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import DataTable from '@/components/common/data-table';
import feedbackColumns from '@/components/common/feedback-columns';
import questionColumns from '@/components/common/question-columns';

import wildberriesStore from '@/stores/wildberries-store';

import { WildberriesTab } from '@/constants';

const MainPage = observer(() => {
  const {
    activeTab,
    isLoading,
    feedbacks,
    questions,
    isProcessing,
    processFeedbacks,
    processQuestions,
  } = wildberriesStore;

  useEffect(() => {
    return () => wildberriesStore.resetStore();
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case WildberriesTab.FEEDBACKS:
        return (
          <DataTable
            columns={feedbackColumns}
            data={feedbacks}
            isProcessing={isProcessing}
            onProcessItems={processFeedbacks}
          />
        );
      case WildberriesTab.QUESTIONS:
        return (
          <DataTable
            columns={questionColumns}
            data={questions}
            isProcessing={isProcessing}
            onProcessItems={processQuestions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="grid h-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        renderTab()
      )}
    </div>
  );
});

export default MainPage;
