import re
import sys
import time
import os
from datetime import datetime

import numpy as np
from google.cloud import speech
import GetSpeech
import LoadSetting
from WordProcess import etri_commands
from CommandProcess import run_command

## 사전에 두 단어를 명사로 등록합니다.

base_dir =  os.path.join(os.path.expanduser('~'), 'Documents', 'iris')
now = datetime.now()
date_dir = now.strftime('%Y-%m-%d')  # 오늘 날짜 폴더
save_dir = os.path.join(base_dir, date_dir)  # 저장할 디렉토리 경로

# 명령어에서 추출할 품사 태그
pos_tags = ['Noun', 'Verb']

# Audio recording parameters

'''
COMMAND_STATE = 0 ( 인공지능 호출 대기 )
COMMAND_STATE = 1 ( 일반 명령어 모드 )
COMMAND_STATE = 2 ( PPT 모드 )
COMMAND_STATE = 3 ( 유튜브 모드 )
COMMAND_STATE = 4 ( 개발자 모드 )
'''
COMMAND_STATE = 0

'''
MODEL_MODE = 0 (구글 API)
MODEL_MODE = 1 (Kospeech)
'''

RED = "\033[0;31m"
GREEN = "\033[0;32m"
YELLOW = "\033[0;33m"

mic_manager = GetSpeech.ResumableMicrophoneStream(GetSpeech.SAMPLE_RATE, GetSpeech.CHUNK_SIZE)

def calculate_volume(audio_data, chunk_size):
    # Convert audio data to a numpy array and compute the RMS value
    audio_array = np.frombuffer(audio_data, dtype=np.int16)
    rms = np.sqrt(np.mean(np.square(audio_array)))

    # Normalize the RMS value to a range of 0 to 1
    volume = rms / (2 ** 15)

    return volume


def get_current_time():
    """Return Current Time in MS."""

    return int(round(time.time() * 1000))

def listen_print_loop(responses, stream):
    """Iterates through server responses and prints them.
    The responses passed is a generator that will block until a response
    is provided by the server.
    Each response may contain multiple results, and each result may contain
    multiple alternatives; for details, see https://goo.gl/tjCPAU.  Here we
    print only the transcription for the top alternative of the top result.
    In this case, responses are provided for interim results as well. If the
    response is an interim one, print a line feed at the end of it, to allow
    the next result to overwrite it, until the response is a final one. For the
    final one, print a newline to preserve the finalized transcription.
    """
    STREAMING_LIMIT = GetSpeech.STREAMING_LIMIT
    for response in responses:
        # print("마이크 입력 들어옴")
        global COMMAND_STATE
        if get_current_time() - stream.start_time > STREAMING_LIMIT:
            stream.start_time = get_current_time()
            break
        if not response.results:
            continue

        result = response.results[0]

        if not result.alternatives:
            continue

        transcript = result.alternatives[0].transcript

        result_seconds = 0
        result_micros = 0

        if result.result_end_time.seconds:
            result_seconds = result.result_end_time.seconds

        if result.result_end_time.microseconds:
            result_micros = result.result_end_time.microseconds

        stream.result_end_time = int((result_seconds * 0.1) + (result_micros / 1000))

        corrected_time = (
            stream.result_end_time
            - stream.bridging_offset
            + (STREAMING_LIMIT * stream.restart_counter)
        )
        # print(corrected_time)
        # Display interim results, but with a carriage return at the end of the
        # line, so subsequent lines will overwrite them.
        # print(transcript)
        # result.is_final = True
        if result.is_final:
            sys.stdout.flush()
            print(transcript.strip())
            sys.stdout.flush()
            # print("This is last sentence.")
            commands = etri_commands(transcript.strip())
            # print(commands)  # ['start']
            run_command(commands)
            stream.is_final_end_time = stream.result_end_time
            stream.last_transcript_was_final = True


        else:
            # sys.stdout.write(RED)
            # sys.stdout.write("\033[K")
            # sys.stdout.write(str(corrected_time) + ":" + transcript + "\r")

            stream.last_transcript_was_final = False


def run_stt():
    """start bidirectional streaming from microphone input to speech API"""

    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=GetSpeech.SAMPLE_RATE,
        language_code="ko-KR",
        model = "command_and_search",
        max_alternatives=1,
        speech_contexts=[{"phrases": ["자비스","발표","이거", "모드","다음","발표","종료","켜줘","실행해줘","실행","꺼줘","카카오톡"]+list(LoadSetting.custom_open.keys())+list(LoadSetting.combine_list)+list(LoadSetting.iris_name)+list(LoadSetting.command_open.keys())}],  # Add your phrase hints
    )

    streaming_config = speech.StreamingRecognitionConfig(
        config=config,
        # interim_results=True,
    )

    # sys.stdout.flush()


    # print(mic_manager.chunk_size)
    # sys.stdout.write(YELLOW)
    # sys.stdout.write('\nListening, say "Quit" or "Exit" to stop.\n\n')
    # sys.stdout.write("End (ms)       Transcript Results/Status\n")
    # sys.stdout.write("=====================================================\n")

    with mic_manager as stream:

        while not stream.closed:
            # sys.stdout.write(YELLOW)
            # sys.stdout.write(
                # "\n" + str(GetSpeech.STREAMING_LIMIT * stream.restart_counter) + ": NEW REQUEST\n"
            # )

            stream.audio_input = []
            audio_generator = stream.generator()

            # print("요청 전송됨")
            requests = (
                speech.StreamingRecognizeRequest(audio_content=content)
                for content in audio_generator
            )

            responses = client.streaming_recognize(streaming_config, requests)

            # Now, put the transcription responses to use.
            listen_print_loop(responses, stream)

            if stream.result_end_time > 0:
                stream.final_request_end_time = stream.is_final_end_time
            stream.result_end_time = 0
            stream.last_audio_input = []
            stream.last_audio_input = stream.audio_input
            stream.audio_input = []
            stream.restart_counter = stream.restart_counter + 1

            if not stream.last_transcript_was_final:
                sys.stdout.write("\n")
            stream.new_stream = True

def change_audio_manager(audio_text):
    print(audio_text)
    mic_manager.change_audio_stream(audio_text)