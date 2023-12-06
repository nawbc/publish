import {
  IonButton,
  IonContent,
  IonHeader,
  IonMenu,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import "./Tab1.css";

const Tab1: React.FC = () => {
  return (
    <>
      <IonMenu type="push" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          This is the menu content.
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar className="demo">
            <IonTitle>Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonButton
            onClick={() => {
              setupIonicReact({
                mode: "ios",
              });
            }}
          >
            IOS mode
          </IonButton>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 1</IonTitle>
            </IonToolbar>
          </IonHeader>
          {/* <ExploreContainer name="Tab 1 page" /> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tab1;
