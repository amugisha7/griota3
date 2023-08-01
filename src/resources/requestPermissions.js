import { Notifications} from "aws-amplify";
import { BackHandler } from "react-native";


const checkPermissions = async()=>{

  const status = await Notifications.Push.getPermissionStatus();
  if (status === 'GRANTED') {
    // no further action is required, user has already granted permissions
    return;
  }
  if (status === 'DENIED') {
    // further attempts to request permissions will no longer do anything
    BackHandler.exitApp();
    return;
  }
  if (status === 'SHOULD_REQUEST') {
    // go ahead and request permissions from the user
    await Notifications.Push.requestPermissions();
  }
  if (status === 'SHOULD_EXPLAIN_THEN_REQUEST') {
    // you should display some explanation to your user before requesting permissions
    // await myFunctionExplainingPermissionsRequest();
    // then request permissions
    await Notifications.Push.requestPermissions();
  }
}



export {checkPermissions}