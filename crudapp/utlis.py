from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2
from django.conf import settings

def translate_text_clarifai(text, target_lang='es'):
    # Define your constants for Clarifai here
    PAT = settings.CLARIFAI_API_KEY  # Add this key to Django settings
    USER_ID = 'helsinkinlp'
    APP_ID = 'translation'
    MODEL_ID = 'text-translation-english-spanish'
    MODEL_VERSION_ID = '643f30558de34013aff72b0e21f244f5'

    # Set up Clarifai channel and stub
    channel = ClarifaiChannel.get_grpc_channel()
    stub = service_pb2_grpc.V2Stub(channel)

    # Set authorization
    metadata = (('authorization', 'Key ' + PAT),)

    # Prepare request data
    userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)
    post_model_outputs_response = stub.PostModelOutputs(
        service_pb2.PostModelOutputsRequest(
            user_app_id=userDataObject,
            model_id=MODEL_ID,
            version_id=MODEL_VERSION_ID,
            inputs=[
                resources_pb2.Input(
                    data=resources_pb2.Data(
                        text=resources_pb2.Text(raw=text)
                    )
                )
            ]
        ),
        metadata=metadata
    )

    # Check if the response was successful
    if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
        print(post_model_outputs_response.status)
        raise Exception("Post model outputs failed, status: " + post_model_outputs_response.status.description)

    # Return the translated text
    output = post_model_outputs_response.outputs[0]
    translated_text = output.data.text.raw if output.data.text else "Translation failed"
    return translated_text
